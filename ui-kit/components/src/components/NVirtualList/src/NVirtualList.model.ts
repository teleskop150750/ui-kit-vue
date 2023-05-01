import { buildProp, buildProps, definePropType, mutable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes, StyleValue } from 'vue'

import { LTR, RTL } from './defaults'
import { layout, scrollbarSize } from './NVirtualScrollbar.model'
import type { GridItemKeyGetter, ItemSize } from './types'

const itemSize = buildProp({
  type: definePropType<number | ItemSize>([Number, Function]),
  required: true,
} as const)

const estimatedItemSize = buildProp({
  type: Number,
} as const)

const cache = buildProp({
  type: Number,
  default: 2,
} as const)

const direction = buildProp({
  type: String,
  values: [LTR, RTL],
  default: LTR,
} as const)

const initScrollOffset = buildProp({
  type: Number,
  default: 0,
} as const)

const total = buildProp({
  type: Number,
  default: undefined,
} as const)

export const virtualProps = buildProps({
  className: {
    type: String,
    default: '',
  },

  containerElement: {
    type: definePropType<string | Element>([String, Object]),
    default: 'div',
  },

  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: definePropType<any[]>(Array),
    default: () => mutable([] as const),
  },

  direction,

  height: {
    type: [Number],
    required: true,
  },

  innerElement: {
    type: [String, Object],
    default: 'div',
  },

  style: {
    type: definePropType<StyleValue>([Object, String, Array]),
  },

  useIsScrolling: {
    type: Boolean,
    default: false,
  },

  width: {
    type: [Number],
    required: false,
  },

  perfMode: {
    type: Boolean,
    default: true,
  },

  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
} as const)

export const virtualListProps = buildProps({
  cache,

  estimatedItemSize,

  layout,

  initScrollOffset,

  total,

  itemSize,
  ...virtualProps,
} as const)

const startGap = { type: Number, default: 0 } as const
const endGap = { type: Number, default: 2 } as const

export const virtualGridProps = buildProps({
  columnCache: cache,
  columnWidth: itemSize,
  estimatedColumnWidth: estimatedItemSize,
  estimatedRowHeight: estimatedItemSize,
  initScrollLeft: initScrollOffset,
  initScrollTop: initScrollOffset,
  itemKey: {
    type: definePropType<GridItemKeyGetter>(Function),
    default: ({ columnIndex, rowIndex }: { columnIndex: number; rowIndex: number }) => `${rowIndex}:${columnIndex}`,
  },
  rowCache: cache,
  rowHeight: itemSize,
  totalColumn: total,
  totalRow: total,
  hScrollbarSize: scrollbarSize,
  vScrollbarSize: scrollbarSize,
  scrollbarStartGap: startGap,
  scrollbarEndGap: endGap,
  ...virtualProps,
} as const)

export type NVirtualProps = ExtractPropTypes<typeof virtualProps>
export type NVirtualListProps = ExtractPropTypes<typeof virtualListProps>
export type NVirtualGridProps = ExtractPropTypes<typeof virtualGridProps>
