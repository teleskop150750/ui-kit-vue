import { createModelToggleComposable } from '@nado/ui-kit-hooks'
import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { popperArrowProps, popperProps } from '../../NPopper'
import type NTooltip from './NTooltip.vue'
import { useTooltipContentProps } from './NTooltipContent.model'
import { useTooltipTriggerProps } from './NTooltipTrigger.model'

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle,
} = createModelToggleComposable('visible' as const)

export const useTooltipProps = buildProps({
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
})

// TODO
export const tooltipEmits = [...useTooltipModelToggleEmits, 'beforeShow', 'beforeHide', 'show', 'hide', 'open', 'close']

export type NTooltipProps = ExtractPropTypes<typeof useTooltipProps>
export type NTooltipInstance = InstanceType<typeof NTooltip>
