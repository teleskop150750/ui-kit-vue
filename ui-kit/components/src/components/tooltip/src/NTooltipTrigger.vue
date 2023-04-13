<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { composeEventHandlers, type Nillable } from '@nado/ui-kit-utils'
import { inject, ref, toRef, unref } from 'vue'

import type { OnlyChildExpose } from '../../only-child'
import { NPopperTrigger } from '../../popper'
import { TOOLTIP_INJECTION_KEY } from './tokens'
import { useTooltipTriggerProps } from './tooltip-trigger.model'
import { whenTrigger } from './utils'

const props = defineProps(useTooltipTriggerProps)

const ns = useNamespace('tooltip')

const { controlled, id, isOpen, open, close, toggle } = inject(TOOLTIP_INJECTION_KEY, undefined)!

const triggerRef = ref<Nillable<OnlyChildExpose>>()

function stopWhenControlledOrDisabled() {
  if (unref(controlled) || props.disabled) {
    return true
  }

  return false
}

const trigger = toRef(props, 'trigger')

const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'hover', open))

const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'hover', close))

const onClick = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'click', (evt) => {
    // distinguish left click
    if ((evt as MouseEvent).button === 0) {
      toggle(evt)
    }
  }),
)

const onFocus = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'focus', open))

const onBlur = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'focus', close))

const onContextMenu = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'contextmenu', (evt: Event) => {
    evt.preventDefault()
    toggle(evt)
  }),
)

// TODO: fix trigger Срабатывает всегда. Нужно такое или нет?
const onKeydown = composeEventHandlers(stopWhenControlledOrDisabled, (evt: KeyboardEvent) => {
  const { code } = evt

  if (props.triggerKeys.includes(code)) {
    evt.preventDefault()
    toggle(evt)
  }
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
  name: 'NTooltipTrigger',
}
</script>

<template>
  <NPopperTrigger
    :id="id"
    :virtual-ref="virtualRef"
    :is-open="isOpen"
    :is-virtual-triggering="isVirtualTriggering"
    :class="ns.e('trigger')"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @keydown="onKeydown"
  >
    <slot />
  </NPopperTrigger>
</template>
