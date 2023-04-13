import { buildProps, isBoolean } from '@nado/ui-kit-utils'
import type { ExtractPropTypes, PropType } from 'vue'

import { dropdownProps } from '../../dropdown'
import { popperFocusTrapPops } from '../../popper'
import { useTooltipContentProps, useTooltipTriggerProps } from '../../tooltip'
import type Popover from './NPopover.vue'

// TODO: merger props Tooltip
export const popoverProps = buildProps({
  ...popperFocusTrapPops,
  trigger: useTooltipTriggerProps.trigger,
  placement: dropdownProps.placement,
  disabled: useTooltipTriggerProps.disabled,
  visible: useTooltipContentProps.visible,
  transition: useTooltipContentProps.transition,
  popperOptions: dropdownProps.popperOptions,
  tabindex: dropdownProps.tabindex,
  content: useTooltipContentProps.content,
  popperStyle: useTooltipContentProps.popperStyle,
  popperClass: useTooltipContentProps.popperClass,
  enterable: {
    ...useTooltipContentProps.enterable,
    default: true,
  },
  effect: {
    ...useTooltipContentProps.effect,
    default: 'light',
  },
  teleported: useTooltipContentProps.teleported,
  title: String,

  width: {
    type: [String, Number],
    default: 150,
  },
  offset: {
    type: Number,
    default: undefined,
  },
  showAfter: {
    type: Number,
    default: 0,
  },
  hideAfter: {
    type: Number,
    default: 200,
  },
  autoClose: {
    type: Number,
    default: 0,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  'onUpdate:visible': {
    type: Function as PropType<(visible: boolean) => void>,
  },
} as const)
export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverEmits = {
  'update:visible': (value: boolean) => isBoolean(value),
  beforeEnter: () => true,
  beforeLeave: () => true,
  afterEnter: () => true,
  afterLeave: () => true,
}
export type NPopoverEmits = typeof popoverEmits

export type NPopoverInstance = InstanceType<typeof Popover>
