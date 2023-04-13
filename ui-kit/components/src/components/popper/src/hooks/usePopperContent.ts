/* eslint-disable @typescript-eslint/no-explicit-any */
import { type PartialOptions, usePopper } from '@nado/ui-kit-hooks'
import { isUndefined } from '@nado/ui-kit-utils'
import type { Modifier } from '@popperjs/core'
import { computed, inject, onMounted, ref, unref, watch } from 'vue'

import type { NPopperContentProps } from '../popper-content.model'
import { POPPER_INJECTION_KEY } from '../tokens'
import { buildPopperOptions, unwrapMeasurableEl } from '../utils'

const DEFAULT_ARROW_OFFSET = 0

export const usePopperContent = (props: NPopperContentProps) => {
  const { popperInstanceRef, contentRef, triggerRef, role } = inject(POPPER_INJECTION_KEY, undefined)!

  const arrowRef = ref<HTMLElement>()
  const arrowOffset = ref<number>()

  const eventListenerModifier = computed(
    () =>
      ({
        name: 'eventListeners',
        enabled: !!props.visible,
      } as Modifier<'eventListeners', any>),
  )

  const arrowModifier = computed(() => {
    const arrowEl = unref(arrowRef)
    const offset = unref(arrowOffset) ?? DEFAULT_ARROW_OFFSET

    // Seems like the `phase` and `fn` is required by Modifier type
    // But on its documentation they didn't specify that.
    // Refer to https://popper.js.org/docs/v2/modifiers/arrow/
    return {
      name: 'arrow',
      enabled: !isUndefined(arrowEl),
      options: {
        element: arrowEl,
        padding: offset,
      },
    } as any
  })

  const options = computed<PartialOptions>(() => ({
    onFirstUpdate: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      update()
    },
    ...buildPopperOptions(props, [unref(arrowModifier), unref(eventListenerModifier)]),
  }))

  const computedReference = computed(() => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef))

  const { attributes, state, styles, update, forceUpdate, instanceRef } = usePopper(
    computedReference,
    contentRef,
    options,
  )

  watch(instanceRef, (instance) => {
    popperInstanceRef.value = instance
  })

  onMounted(() => {
    watch(
      () => unref(computedReference)?.getBoundingClientRect(),
      () => {
        update()
      },
    )
  })

  return {
    attributes,
    arrowRef,
    contentRef,
    instanceRef,
    state,
    styles,
    role,

    forceUpdate,
    update,
  }
}

export type UsePopperContentReturn = ReturnType<typeof usePopperContent>
