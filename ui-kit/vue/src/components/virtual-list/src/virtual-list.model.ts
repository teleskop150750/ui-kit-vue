import { buildProp, buildProps, definePropType, mutable } from '@ui/utils'
import type { ExtractPropTypes, StyleValue } from 'vue'

import { HORIZONTAL, LTR, RTL, VERTICAL } from './defaults'
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

const layout = buildProp({
  type: String,
  values: [VERTICAL, HORIZONTAL],
  default: VERTICAL,
} as const)

export const virtualizedProps = buildProps({
  className: {
    type: String,
    default: '',
  },

  containerElement: {
    type: definePropType<string | Element>([String, Object]),
    default: 'div',
  },

  data: {
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

export const virtualizedListProps = buildProps({
  cache,

  estimatedItemSize,

  layout,

  initScrollOffset,

  total,

  itemSize,
  ...virtualizedProps,
} as const)

const scrollbarSize = {
  type: Number,
  default: 12,
} as const

const startGap = { type: Number, default: 0 } as const
const endGap = { type: Number, default: 2 } as const

export const virtualizedGridProps = buildProps({
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
  ...virtualizedProps,
} as const)

export const virtualizedScrollbarProps = buildProps({
  alwaysOn: Boolean,
  class: String,
  layout,
  total,
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

export type VirtualizedProps = ExtractPropTypes<typeof virtualizedProps>
export type VirtualizedListProps = ExtractPropTypes<typeof virtualizedListProps>
export type VirtualizedGridProps = ExtractPropTypes<typeof virtualizedGridProps>

export type VirtualizedScrollbarProps = ExtractPropTypes<typeof virtualizedScrollbarProps>
