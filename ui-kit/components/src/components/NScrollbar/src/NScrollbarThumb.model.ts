import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NScrollbarThumb from './NScrollbarThumb.vue'

export const scrollbarThumbProps = buildProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: undefined,
  },
  move: {
    type: Number,
    default: undefined,
  },
  ratio: {
    type: Number,
    required: true,
  },
  always: {
    type: Boolean,
    default: false,
  },
} as const)

export type NScrollbarThumbProps = ExtractPropTypes<typeof scrollbarThumbProps>

export type NScrollbarThumbInstance = InstanceType<typeof NScrollbarThumb>
