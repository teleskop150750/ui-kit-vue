import type { ExtractPropTypes } from 'vue'

import type NBar from './bar.vue'

export const nBarProps = {
  always: {
    type: Boolean,
    default: false,
  },
  width: String,
  height: String,
  ratioX: {
    type: Number,
    default: 1,
  },
  ratioY: {
    type: Number,
    default: 1,
  },
} as const

export type NBarProps = ExtractPropTypes<typeof nBarProps>

export type NBarInstance = InstanceType<typeof NBar>
