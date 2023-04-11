import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Arrow from './NPopperArrow.vue'

export const nPopperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5,
  },
} as const)
export type NPopperArrowProps = ExtractPropTypes<typeof nPopperArrowProps>

export type NPopperArrowInstance = InstanceType<typeof Arrow>
