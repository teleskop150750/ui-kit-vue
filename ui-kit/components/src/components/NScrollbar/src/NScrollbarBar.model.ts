import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NScrollbarBar from './NScrollbarBar.vue'

export const scrollbarBarProps = buildProps({
  always: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  ratioX: {
    type: Number,
    default: 1,
  },
  ratioY: {
    type: Number,
    default: 1,
  },
} as const)

export type NScrollbarBarProps = ExtractPropTypes<typeof scrollbarBarProps>

export type NScrollbarBarInstance = InstanceType<typeof NScrollbarBar>
