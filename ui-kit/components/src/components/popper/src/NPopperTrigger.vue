<script lang="ts" setup>
import { useForwardRef } from '@nado/ui-kit-hooks'
import { isElement, isNil } from '@nado/ui-kit-utils'
import { unrefElement } from '@vueuse/core'
import { computed, inject, onBeforeUnmount, onMounted, watch, type WatchStopHandle } from 'vue'

import { popperTriggerProps } from './popper-trigger.model'
import { POPPER_INJECTION_KEY } from './tokens'

const props = defineProps(popperTriggerProps)

const { role, triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!

useForwardRef(triggerRef)

const ariaControls = computed<string | undefined>(() => (ariaHaspopup.value ? props.id : undefined))

const ariaDescribedby = computed<string | undefined>(() => {
  if (role && role.value === 'tooltip') {
    return props.open && props.id ? props.id : undefined
  }

  return undefined
})

const ariaHaspopup = computed<string | undefined>(() => {
  if (role && role.value !== 'tooltip') {
    return role.value
  }

  return undefined
})

const ariaExpanded = computed<string | undefined>(() => (ariaHaspopup.value ? `${props.open}` : undefined))

let virtualTriggerAriaStopWatch: WatchStopHandle | undefined = undefined

onMounted(() => {
  watch(
    () => props.virtualRef,
    (virtualEl) => {
      if (virtualEl) {
        triggerRef.value = unrefElement(virtualEl as HTMLElement)
      }
    },
    {
      immediate: true,
    },
  )

  watch(
    triggerRef,
    (el, prevEl) => {
      virtualTriggerAriaStopWatch?.()
      virtualTriggerAriaStopWatch = undefined

      if (isElement(el)) {
        ;(
          ['onMouseenter', 'onMouseleave', 'onClick', 'onKeydown', 'onFocus', 'onBlur', 'onContextmenu'] as const
        ).forEach((eventName) => {
          const handler = props[eventName]

          if (handler) {
            ;(el as HTMLElement).addEventListener(eventName.slice(2).toLowerCase(), handler)
            ;(prevEl as HTMLElement)?.removeEventListener?.(eventName.slice(2).toLowerCase(), handler)
          }
        })
        virtualTriggerAriaStopWatch = watch(
          [ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded],
          (watches) => {
            ;['aria-controls', 'aria-describedby', 'aria-haspopup', 'aria-expanded'].forEach((key, idx) => {
              isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]!)
            })
          },
          { immediate: true },
        )
      }

      if (isElement(prevEl)) {
        ;['aria-controls', 'aria-describedby', 'aria-haspopup', 'aria-expanded'].forEach((key) =>
          prevEl.removeAttribute(key),
        )
      }
    },
    {
      immediate: true,
    },
  )
})

onBeforeUnmount(() => {
  virtualTriggerAriaStopWatch?.()
  virtualTriggerAriaStopWatch = undefined
})

defineExpose({
  /**
   * @description trigger element
   */
  triggerRef,
})
</script>

<script lang="ts">
export default {
  name: 'NPopperTrigger',
  inheritAttrs: false,
}
</script>

<template>
  <ElOnlyChild
    v-if="!virtualTriggering"
    v-bind="$attrs"
    :aria-controls="ariaControls"
    :aria-describedby="ariaDescribedby"
    :aria-expanded="ariaExpanded"
    :aria-haspopup="ariaHaspopup"
  >
    <slot />
  </ElOnlyChild>
</template>
