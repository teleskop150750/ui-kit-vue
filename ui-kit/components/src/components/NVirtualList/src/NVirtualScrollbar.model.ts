import { buildProp, buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { HORIZONTAL, VERTICAL } from './defaults'
import type NVirtualScrollbar from './NVirtualScrollbar.vue'

export const scrollbarSize = {
  type: Number,
  default: 12,
} as const

export const layout = buildProp({
  type: String,
  values: [VERTICAL, HORIZONTAL],
  default: VERTICAL,
} as const)

export const virtualScrollbarProps = buildProps({
  alwaysOn: Boolean,
  class: String,
  layout,
  ratio: {
    type: Number,
    required: true,
  },
  clientSize: {
    type: Number,
    required: true,
  },
  scrollFrom: {
    type: Number,
    required: true,
  },
  scrollbarSize,
  visible: {
    type: Boolean,
    default: false,
  },
} as const)

export type VirtualizedScrollbarProps = ExtractPropTypes<typeof virtualScrollbarProps>
export type NVirtualScrollbarInstance = InstanceType<typeof NVirtualScrollbar>
