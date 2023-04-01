import { focusable, type FocusableElement, isFocusable, isTabbable, tabbable } from '@nado/tabbable'

import { getActualTarget, isEscapeEvent, isTabEvent } from './event'
import { useFindContainerIndex, useGetNodeForOption, useGetOption } from './hooks'
import { isSelectableInput } from './node'
import type {
  ActivateOptions,
  Arrayable,
  Config,
  DeactivateOptions,
  FocusTrap,
  FocusTrapOptions,
  Nillable,
} from './types'
import { delay, initConfig, initState, valueOrHandler } from './utils'

const activeFocusTraps = {
  activateTrap(trapStack: FocusTrap[], trap: FocusTrap) {
    if (trapStack.length > 0) {
      const activeTrap = trapStack.at(-1)!

      if (activeTrap !== trap) {
        activeTrap.pause()
      }
    }

    const trapIndex = trapStack.indexOf(trap)

    if (trapIndex === -1) {
      trapStack.push(trap)
    } else {
      // move this existing trap to the front of the queue
      trapStack.splice(trapIndex, 1)
      trapStack.push(trap)
    }
  },

  deactivateTrap(trapStack: FocusTrap[], trap: FocusTrap) {
    const trapIndex = trapStack.indexOf(trap)

    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1)
    }

    if (trapStack.length > 0) {
      trapStack.at(-1)!.unpause()
    }
  },
}

// NOTE: this must be _outside_ `createFocusTrap()` to make sure all traps in this
//  current instance use the same stack if `userOptions.trapStack` isn't specified
const internalTrapStack: FocusTrap[] = []

interface Params {
  elements: Arrayable<FocusableElement | string>
  userOptions?: FocusTrapOptions
}

export function createFocusTrap(elements: Params['elements'], userOptions?: Params['userOptions']): FocusTrap {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  const trapStack = userOptions?.trapStack || internalTrapStack

  const config = initConfig(userOptions)
  const state = initState()
  const doc = config.document
  let trap: FocusTrap

  /** Получает значение параметра конфигурации. */
  const { getOption } = useGetOption(config)

  /** Находит индекс контейнера, содержащего элемент. */
  const { findContainerIndex } = useFindContainerIndex(state)
  const { getNodeForOption } = useGetNodeForOption(config)

  function getInitialFocusNode(): FocusableElement | false {
    let initialFocusNode = getNodeForOption('initialFocus')

    // false явно указывает, что мы вообще не хотим никакого начального фокуса
    if (initialFocusNode === false) {
      return false
    }

    if (initialFocusNode === undefined) {
      // опция не указана: используйте резервные опции
      if (doc.activeElement && findContainerIndex(doc.activeElement as HTMLElement) >= 0) {
        initialFocusNode = doc.activeElement as HTMLElement
      } else {
        const firstTabbableGroup = state.tabbableGroups[0]
        const firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode

        // NOTE: `fallbackFocus` option function cannot return `false` (not supported)
        initialFocusNode = firstTabbableNode || getNodeForOption('fallbackFocus')
      }
    }

    if (!initialFocusNode) {
      throw new Error('Ваш focus-trap должен иметь по крайней мере один фокусируемый элемент')
    }

    return initialFocusNode
  }

  function updateTabbableNodes() {
    state.containerGroups = state.containers.map((container) => {
      const tabbableNodes = tabbable(container, config.tabbableOptions)

      // NOTE: если у нас есть tabbable узлы, у нас должны быть фокусируемые узлы; фокусируемые узлы - это надмножество tabbable узлов
      const focusableNodes = focusable(container, config.tabbableOptions)

      return {
        container,
        tabbableNodes,
        focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : undefined,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes.at(-1) : undefined,

        /**
         * Находит __tabbable__ узел, который следует за данным узлом в указанном направлении,
         * в этом контейнере, если таковой имеется.
         */
        nextTabbableNode(node: FocusableElement, forward = true): Nillable<FocusableElement> {
          // NOTE: Если tabindex положительный (для того, чтобы управлять порядком табуляции отдельно от порядка DOM), это __ не сработает__,
          // потому что список focusableNodes, хотя и содержит узлы с возможностью табуляции, не сортирует свои узлы ни в каком порядке,
          // кроме порядка DOM, потому что он не может:
          // Where would you place focusable (but not
          //  tabbable) nodes in that order? They have no order, because they aren't tabbale...

          // Поддержка positive tabindex уже нарушена, и ею трудно управлять (возможно, она не поддерживается, TBD),
          // так что это не ухудшит ситуацию, чем она уже есть, и, по крайней мере, улучшит ситуацию в большинстве случаев,
          // когда tabindex либо 0 / не установлен, либо отрицательный..
          // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
          const nodeIdx = focusableNodes.indexOf(node)

          if (nodeIdx < 0) {
            return undefined
          }

          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find((n) => isTabbable(n, config.tabbableOptions))
          }

          return focusableNodes
            .slice(0, nodeIdx)
            .reverse()
            .find((n) => isTabbable(n, config.tabbableOptions))
        },
      }
    })

    state.tabbableGroups = state.containerGroups.filter((group) => group.tabbableNodes.length > 0)

    // throw if no groups have tabbable nodes and we don't have a fallback focus node either
    if (
      state.tabbableGroups.length <= 0 &&
      !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error(
        'Your focus-trap must have at least one container with at least one tabbable node in it at all times',
      )
    }
  }

  function tryFocus(node: FocusableElement | false): undefined {
    if (node === false) {
      return undefined
    }

    if (node === doc.activeElement) {
      return undefined
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode())

      return undefined
    }

    node.focus({ preventScroll: !!config.preventScroll })
    state.mostRecentlyFocusedNode = node as HTMLElement

    if (isSelectableInput(node)) {
      node.select()
    }

    return undefined
  }

  function getReturnFocusNode(previousActiveElement: FocusableElement) {
    const returnFocusNode = getNodeForOption('setReturnFocus', previousActiveElement)

    return returnFocusNode || (returnFocusNode === false ? false : previousActiveElement)
  }

  // Это нужно делать при mousedown and touchstart, чтобы оно предшествовало событию фокуса..
  function checkPointerDown(evt: Event) {
    const target = getActualTarget(evt)!

    if (findContainerIndex(target) >= 0) {
      // разрешить щелчок, так как он произошел внутри ловушки
      return
    }

    if (valueOrHandler(config.clickOutsideDeactivates, evt)) {
      // немедленно деактивировать ловушку
      trap.deactivate({
        returnFocus: config.returnFocusOnDeactivate,
      })

      return
    }

    // Это нужно для мобильных устройств.
    // (If we'll only let `click` events through, then on mobile they will be blocked anyways if `touchstart` is blocked.)
    if (valueOrHandler(config.allowOutsideClick, evt)) {
      // разрешить щелчок за пределами ловушки
      return
    }

    evt.preventDefault()
  }

  // Если по какой-то странной причине фокус ускользает из ловушки, верните его обратно.
  function checkFocusIn(evt: Event) {
    const target = getActualTarget(evt)!
    const targetContained = findContainerIndex(target) >= 0

    // В Firefox, когда вы выходите из iframe, документ ненадолго фокусируется.
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target
      }

      return
    }

    // сбежал! верните его туда, где он только что ушел
    evt.stopImmediatePropagation()
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode())
  }

  // Перехватывать ключевые события навигации на первом и последнем фокусируемых узлах ловушки, чтобы фокус не ускользал.
  // Если он исчезает даже на мгновение, это может закончиться прокруткой страницы и вызвать путаницу,
  // поэтому нам нужно зафиксировать действие на этапе нажатия клавиши.
  function checkKeyNav(event: KeyboardEvent, isBackward = false) {
    const target = getActualTarget(event)!

    updateTabbableNodes()

    let destinationNode: Nillable<FocusableElement> = undefined

    if (state.tabbableGroups.length === 0) {
      // нет доступных групп
      // NOTE: опция fallbackFocus не поддерживает возврат false для отказа
      destinationNode = getNodeForOption('fallbackFocus') as Nillable<FocusableElement>
    } else {
      // убедитесь, что цель действительно содержится в группе
      // NOTE: цель также может быть самим контейнером, если он может быть сфокусирован с помощью tabIndex='-1' и ему был присвоен первоначальный фокус
      const containerIndex = findContainerIndex(target)

      if (containerIndex < 0) {
        // цель не найдена ни в одной группе: вполне возможно, что фокус ускользнул из ловушки, так что верните его в...
        // ...последний узел в последней группе
        // ...первый узел в первой группе
        destinationNode = isBackward
          ? state.tabbableGroups.at(-1)!.lastTabbableNode
          : state.tabbableGroups[0]?.firstTabbableNode
      } else {
        const containerGroup = state.containerGroups[containerIndex]

        if (isBackward) {
          // REVERSE

          let startOfGroupIndex = state.tabbableGroups.findIndex(
            ({ firstTabbableNode }) => target === firstTabbableNode,
          )

          if (
            startOfGroupIndex < 0 &&
            ((containerGroup && containerGroup.container === target) ||
              (isFocusable(target, config.tabbableOptions) &&
                !isTabbable(target, config.tabbableOptions) &&
                !containerGroup!.nextTabbableNode(target, false)))
          ) {
            // исключительный случай, когда целью является либо сам контейнер,
            // либо non-tabbable node, которому был присвоен фокус
            // (т. е. tabindex отрицателен, и пользователь щелкнул по нему, или узел был программно сфокусирован)
            // и за ним не следует какой-либо другой tabbable node,
            // в в этом случае мы должны обрабатывать shift+tab так,
            // как если бы фокус был на первом tabbable node контейнера,
            // и переходить к последнему tabbable node группы LAST.
            startOfGroupIndex = containerIndex
          }

          if (startOfGroupIndex >= 0) {
            // YES: затем shift+tab должен перейти к последнему tabbable node в предыдущей группе
            // (и перейти к последнему tabbable node в ПОСЛЕДНЕЙ группе, если это первый tabbable node ПЕРВОЙ группы)
            const destinationGroupIndex =
              startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1

            const destinationGroup = state.tabbableGroups[destinationGroupIndex]

            destinationNode = destinationGroup?.lastTabbableNode
          } else if (!isTabEvent(event)) {
            // пользователь должен настроить навигационные клавиши,
            // поэтому нам нужно вручную перемещать фокус _внутри_ активной группы:
            // делайте это на основе порядка, определенного tabbable()
            destinationNode = containerGroup?.nextTabbableNode(target, false)
          }
        } else {
          // FORWARD

          let lastOfGroupIndex = state.tabbableGroups.findIndex(({ lastTabbableNode }) => target === lastTabbableNode)

          if (
            lastOfGroupIndex < 0 &&
            (containerGroup!.container === target ||
              (isFocusable(target, config.tabbableOptions) &&
                !isTabbable(target, config.tabbableOptions) &&
                !containerGroup!.nextTabbableNode(target)))
          ) {
            lastOfGroupIndex = containerIndex
          }

          if (lastOfGroupIndex >= 0) {
            // YES: затем tab должен перейти к первому tabbable node в следующей группе
            // (и перейти к первому tabbable node в ПЕРВОЙ группе, если это последний tabbable node в ПОСЛЕДНЕЙ группе)
            const destinationGroupIndex =
              lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1

            const destinationGroup = state.tabbableGroups[destinationGroupIndex]

            destinationNode = destinationGroup?.firstTabbableNode
          } else if (!isTabEvent(event)) {
            // user must have customized the nav keys so we have to move focus manually _within_
            //  the active group: do this based on the order determined by tabbable()
            destinationNode = containerGroup!.nextTabbableNode(target)
          }
        }
      }
    }

    if (destinationNode) {
      if (isTabEvent(event)) {
        // since tab natively moves focus, we wouldn't have a destination node unless we
        //  were on the edge of a container and had to move to the next/previous edge, in
        //  which case we want to prevent default to keep the browser from moving focus
        //  to where it normally would
        event.preventDefault()
      }

      tryFocus(destinationNode)
    }
    // else, пусть браузер позаботится [shift+]tab и переместит фокус
  }

  function checkKey(evt: KeyboardEvent) {
    if (isEscapeEvent(evt) && valueOrHandler(config.escapeDeactivates, evt) !== false) {
      evt.preventDefault()
      trap.deactivate()

      return
    }

    if (config.isKeyForward(evt) || config.isKeyBackward(evt)) {
      checkKeyNav(evt, config.isKeyBackward(evt))
    }
  }

  function checkClick(evt: MouseEvent) {
    const target = getActualTarget(evt)!

    if (findContainerIndex(target) >= 0) {
      return
    }

    if (valueOrHandler(config.clickOutsideDeactivates, evt)) {
      return
    }

    if (valueOrHandler(config.allowOutsideClick!, evt)) {
      return
    }

    evt.preventDefault()
    evt.stopImmediatePropagation()
  }

  //
  // EVENT LISTENERS
  //

  function addListeners() {
    if (!state.active) {
      return
    }

    // Одновременно может быть только одна ловушка фокуса прослушивания.
    activeFocusTraps.activateTrap(trapStack, trap)

    // Задержка гарантирует, что сфокусированный элемент не зафиксирует событие, вызвавшее активацию ловушки фокуса.
    state.delayInitialFocusTimer = config.delayInitialFocus
      ? delay(() => {
          tryFocus(getInitialFocusNode())
        })
      : tryFocus(getInitialFocusNode())

    doc.addEventListener('focusin', checkFocusIn, true)
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false,
    })
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false,
    })
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false,
    })
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false,
    })

    return trap
  }

  function removeListeners() {
    if (!state.active) {
      return
    }

    doc.removeEventListener('focusin', checkFocusIn, true)
    doc.removeEventListener('mousedown', checkPointerDown, true)
    doc.removeEventListener('touchstart', checkPointerDown, true)
    doc.removeEventListener('click', checkClick, true)
    doc.removeEventListener('keydown', checkKey, true)

    return trap
  }

  //
  // TRAP DEFINITION
  //

  trap = {
    get active() {
      return state.active
    },

    get paused() {
      return state.paused
    },

    activate(activateOptions: Nillable<ActivateOptions>) {
      if (state.active) {
        return this
      }

      const onActivate = getOption(activateOptions, 'onActivate') as Config['onActivate']
      const onPostActivate = getOption(activateOptions, 'onPostActivate') as Config['onPostActivate']
      const checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap') as Config['checkCanFocusTrap']

      if (!checkCanFocusTrap) {
        updateTabbableNodes()
      }

      state.active = true
      state.paused = false
      state.nodeFocusedBeforeActivation = (doc.activeElement as HTMLElement) || undefined

      if (onActivate) {
        onActivate()
      }

      const finishActivation = () => {
        if (checkCanFocusTrap) {
          updateTabbableNodes()
        }

        addListeners()

        if (onPostActivate) {
          onPostActivate()
        }
      }

      if (checkCanFocusTrap) {
        // eslint-disable-next-line promise/catch-or-return
        checkCanFocusTrap([...state.containers]).then(finishActivation, finishActivation)

        return this
      }

      finishActivation()

      return this
    },

    deactivate(deactivateOptions?: DeactivateOptions | undefined): FocusTrap {
      if (!state.active) {
        return this
      }

      const options = {
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus,
        ...deactivateOptions,
      }

      clearTimeout(state.delayInitialFocusTimer) // noop if undefined
      state.delayInitialFocusTimer = undefined

      removeListeners()
      state.active = false
      state.paused = false

      activeFocusTraps.deactivateTrap(trapStack, trap)

      const onDeactivate = getOption(options, 'onDeactivate') as Config['onDeactivate']
      const onPostDeactivate = getOption(options, 'onPostDeactivate') as Config['onPostDeactivate']
      const checkCanReturnFocus = getOption(options, 'checkCanReturnFocus') as Config['checkCanReturnFocus']
      const returnFocus = getOption(
        options,
        'returnFocus',
        'returnFocusOnDeactivate',
      ) as Config['returnFocusOnDeactivate']

      if (onDeactivate) {
        onDeactivate()
      }

      const finishDeactivation = () => {
        delay(() => {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation!))
          }

          if (onPostDeactivate) {
            onPostDeactivate()
          }
        })
      }

      if (returnFocus && checkCanReturnFocus) {
        // eslint-disable-next-line promise/catch-or-return
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation!) as FocusableElement).then(
          finishDeactivation,
          finishDeactivation,
        )

        return this
      }

      finishDeactivation()

      return this
    },

    pause(): FocusTrap {
      if (state.paused || !state.active) {
        return this
      }

      state.paused = true
      removeListeners()

      return this
    },

    unpause(): FocusTrap {
      if (!state.paused || !state.active) {
        return this
      }

      state.paused = false
      updateTabbableNodes()
      addListeners()

      return this
    },

    updateContainerElements(containerElements: Arrayable<FocusableElement | string>): FocusTrap {
      const elementsAsArray = [containerElements].flat().filter(Boolean)

      state.containers = elementsAsArray.map((element) =>
        typeof element === 'string' ? doc.querySelector<FocusableElement>(element)! : element,
      )

      if (state.active) {
        updateTabbableNodes()
      }

      return this
    },
  }

  // инициализировать элементы контейнера
  trap.updateContainerElements(elements)

  return trap
}
