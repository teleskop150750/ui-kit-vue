import { useDelayedToggleProps } from '@nado/ui-kit-hooks'
import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { popperContentProps } from '../../NPopper'
import type NTooltipContent from './NTooltipContent.vue'

export const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps,
  /**
   * @description which element the tooltip CONTENT appends to
   */
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
  },
  /**
   * @description display content, can be overridden by `slot#content`
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * @description whether `content` is treated as HTML string
   */
  rawContent: {
    type: Boolean,
    default: false,
  },
  /**
   * @description when tooltip inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent: Boolean,
  /**
   * @description same as `aria-label`
   */
  ariaLabel: String,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  /**
   * @description visibility of Tooltip
   */
  visible: {
    type: definePropType<boolean | null>(Boolean),
    // eslint-disable-next-line unicorn/no-null
    default: null,
  },
  /**
   * @description animation name
   */
  transition: String,
  /**
   * @description whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets
   */
  teleported: {
    type: Boolean,
    default: true,
  },
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean,
} as const)

export type NTooltipContentProps = ExtractPropTypes<typeof useTooltipContentProps>
export type NTooltipContentInstance = InstanceType<typeof NTooltipContent>
