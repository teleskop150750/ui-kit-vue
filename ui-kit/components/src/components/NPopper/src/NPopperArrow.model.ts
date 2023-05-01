import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NArrow from './NPopperArrow.vue'

export const popperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5,
  },
} as const)

export type NPopperArrowProps = ExtractPropTypes<typeof popperArrowProps>
export type NPopperArrowInstance = InstanceType<typeof NArrow>
