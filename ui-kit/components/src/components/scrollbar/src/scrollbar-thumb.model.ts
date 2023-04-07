import type { ExtractPropTypes } from 'vue'

import type NThumb from './NScrollbarThumb.vue'

export const nThumbProps = {
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
} as const

export type NThumbProps = ExtractPropTypes<typeof nThumbProps>

export type NThumbInstance = InstanceType<typeof NThumb>
