<script lang="ts" setup>
import { useForwardRef } from '@nado/ui-kit-hooks'
import { isElement, isNil, type Nillable } from '@nado/ui-kit-utils'
import { unrefElement } from '@vueuse/core'
import { computed, inject, onBeforeUnmount, onMounted, watch, type WatchStopHandle } from 'vue'

import { NOnlyChild } from '../../NOnlyChild'
import { popperTriggerProps } from './NPopperTrigger.model'
import { POPPER_INJECTION_KEY } from './tokens'

const props = defineProps(popperTriggerProps)

const { role, triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!

useForwardRef(triggerRef)

const ariaHaspopup = computed<string | undefined>(() => {
  if (role && role.value !== 'tooltip') {
    return role.value
  }

  return undefined
})

const ariaControls = computed<string | undefined>(() => (ariaHaspopup.value ? props.id : undefined))

const ariaDescribedby = computed<string | undefined>(() => {
  if (role && role.value === 'tooltip') {
    return props.isOpen && props.id ? props.id : undefined
  }

  return undefined
})

const ariaExpanded = computed<Nillable<string>>(() => (ariaHaspopup.value ? `${props.isOpen}` : undefined))

let virtualStopWatch: Nillable<WatchStopHandle> = undefined
let triggerStopWatch: Nillable<WatchStopHandle> = undefined
let virtualTriggerAriaStopWatch: Nillable<WatchStopHandle> = undefined

onMounted(() => {
  virtualStopWatch = watch(
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

  triggerStopWatch = watch(
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
  virtualStopWatch?.()
  triggerStopWatch?.()
  virtualTriggerAriaStopWatch = undefined
  virtualStopWatch = undefined
  triggerStopWatch = undefined
})

defineExpose({
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
  <NOnlyChild
    v-if="!isVirtualTriggering"
    v-bind="$attrs"
    :aria-controls="ariaControls"
    :aria-describedby="ariaDescribedby"
    :aria-expanded="ariaExpanded"
    :aria-haspopup="ariaHaspopup"
  >
    <slot />
  </NOnlyChild>
</template>
