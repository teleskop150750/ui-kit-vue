import type { FocusableElement } from '@nado/tabbable'

import { isKeyBackward, isKeyForward } from './event'
import type { Config, FocusTrapOptions, Nillable } from './types'

export function delay(fn: Function) {
  return setTimeout(fn, 0)
}

export function valueOrHandler(value: string | Function | any, ...params: any) {
  return typeof value === 'function' ? value(...params) : value
}

export function initConfig(options?: FocusTrapOptions): Config {
  const config = {
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isKeyForward,
    isKeyBackward,
    ...options,
  }

  const doc = config.document || document

  config.document = doc

  return config as Config
}

export interface ContainerGroup {
  container: FocusableElement
  tabbableNodes: FocusableElement[]
  focusableNodes: FocusableElement[]
  firstTabbableNode: Nillable<FocusableElement>
  lastTabbableNode: Nillable<FocusableElement>
  nextTabbableNode: (node: FocusableElement, forward?: boolean) => FocusableElement | undefined
}

export function initState() {
  return {
    /** контейнеры, предоставленные для createFocusTrap */
    containers: [] as Array<FocusableElement>,

    // список объектов, идентифицирующих tabbable nodes in `containers` in the trap
    // NOTE: возможно, что в группе нет tabbable узлов,
    // если узлы удаляются, пока ловушка активна, но ловушка никогда не должна переходить в состояние,
    // в котором нет хотя бы одной группы с хотя бы одним tabbable узлом
    // (это привело бы к условию ошибки, которое привело бы к появлению ошибки брошенный)
    containerGroups: [] as ContainerGroup[], // тот же порядок / длина, что и в списке "контейнеры"

    // ссылки на объекты в `containerGroups`, но только на те, в которых действительно есть tabbable узлы
    // NOTE: тот же порядок, что и у "containers" и "containerGroups групп", но __не обязательно__
    // той же длины
    tabbableGroups: [] as ContainerGroup[],

    nodeFocusedBeforeActivation: undefined as Nillable<FocusableElement>,
    mostRecentlyFocusedNode: undefined as Nillable<FocusableElement>,
    active: false,
    paused: false,

    // ID таймера, когда задержка начальной фокусировки имеет значение true и начальная фокусировка в этой ловушке была отложена во время активации
    delayInitialFocusTimer: undefined as number | undefined,
  }
}

export type State = ReturnType<typeof initState>
