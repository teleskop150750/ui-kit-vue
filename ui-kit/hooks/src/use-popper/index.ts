/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Nillable } from '@nado/ui-kit-utils'
import {
  createPopper,
  type Instance,
  type Modifier,
  type Options,
  type State,
  type VirtualElement,
} from '@popperjs/core'
import { computed, onBeforeUnmount, type Ref, ref, shallowRef, unref, watch } from 'vue'

type ElementType = Nillable<HTMLElement>
export type ReferenceElement = ElementType | VirtualElement
export type PartialOptions = Partial<Options>

type States = Ref<Pick<State, 'styles' | 'attributes'>>

export const usePopper = (
  referenceElementRef: Ref<ReferenceElement>,
  popperElementRef: Ref<ElementType>,
  opts: Ref<PartialOptions> | PartialOptions = {} as PartialOptions,
) => {
  const states: States = ref({ styles: {}, attributes: {} })

  const stateUpdater = {
    name: 'updateState',
    enabled: true,
    phase: 'write',
    fn: ({ state }) => {
      const derivedState = deriveState(state)

      Object.assign(states.value, derivedState)
    },
    requires: ['computeStyles'],
  } as Modifier<'updateState', any>

  const options = computed<Options>(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts)

    return {
      onFirstUpdate,
      placement: placement || 'bottom',
      strategy: strategy || 'absolute',
      modifiers: [...(modifiers || []), stateUpdater, { name: 'applyStyles', enabled: false }],
    }
  })

  const instanceRef = shallowRef<Instance | undefined>()

  states.value = {
    styles: {
      popper: {
        position: unref(options).strategy,
        left: '0',
        right: '0',
      },
      arrow: {
        position: 'absolute',
      },
    },
    attributes: {},
  }

  const destroy = () => {
    if (!instanceRef.value) {
      return
    }

    instanceRef.value.destroy()
    instanceRef.value = undefined
  }

  watch(
    options,
    (newOptions) => {
      const instance = unref(instanceRef)

      if (instance) {
        instance.setOptions(newOptions)
      }
    },
    {
      deep: true,
    },
  )

  watch([referenceElementRef, popperElementRef], ([referenceElement, popperElement]) => {
    destroy()

    if (!referenceElement || !popperElement) {
      return
    }

    instanceRef.value = createPopper(referenceElement, popperElement, unref(options))
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    state: computed(() => ({ ...unref(instanceRef)?.state })),
    styles: computed(() => unref(states).styles),
    attributes: computed(() => unref(states).attributes),
    update: () => unref(instanceRef)?.update(),
    forceUpdate: () => unref(instanceRef)?.forceUpdate(),
    // Preventing end users from modifying the instance.
    instanceRef: computed(() => unref(instanceRef)),
  }
}

function deriveState(state: State) {
  const elements = Object.keys(state.elements) as unknown as Array<keyof State['elements']>

  const styles = Object.fromEntries(
    elements.map(
      (element) => [element, state.styles[element] || {}] as [string, State['styles'][keyof State['styles']]],
    ),
  )

  const attributes = Object.fromEntries(
    elements.map(
      (element) => [element, state.attributes[element]] as [string, State['attributes'][keyof State['attributes']]],
    ),
  )

  return {
    styles,
    attributes,
  }
}

export type UsePopperReturn = ReturnType<typeof usePopper>
