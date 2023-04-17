import { createModelToggleComposable } from '@nado/ui-kit-hooks'
import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { nPopperArrowProps, nPopperProps } from '../../popper'
import type NTooltip from './NTooltip.vue'
import { useTooltipContentProps } from './tooltip-content.model'
import { useTooltipTriggerProps } from './tooltip-trigger.model'

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle,
} = createModelToggleComposable('visible' as const)

export const useTooltipProps = buildProps({
  ...nPopperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...nPopperArrowProps,
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
})

export const tooltipEmits = [...useTooltipModelToggleEmits, 'beforeShow', 'beforeHide', 'show', 'hide', 'open', 'close']

export type NTooltipProps = ExtractPropTypes<typeof useTooltipProps>

export type NTooltipInstance = InstanceType<typeof NTooltip>
