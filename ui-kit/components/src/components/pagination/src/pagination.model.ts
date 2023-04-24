import { componentSizes } from '@nado/ui-kit-constants'
import { NIconArrowLeft, NIconArrowRight } from '@nado/ui-kit-icons-vue'
import { buildProps, definePropType, iconPropType, isNumber, mutable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

export interface PaginationTemplate {
  nav: boolean
  size: boolean
}

export const nPaginationQueryProps = buildProps({
  queryType: {
    type: String,
    values: ['number', 'offset'],
  },
  queryPageNumber: {
    type: String,
    default: 'page[number]',
  },
  queryPageSize: {
    type: String,
    default: 'page[size]',
  },
  queryPageOffset: {
    type: String,
    default: 'page[offset]',
  },
  queryPageLimit: {
    type: String,
    default: 'page[limit]',
  },
} as const)

export const nPaginationRageProps = buildProps({
  currentPage: Number,
  pageSize: Number,
} as const)

export const nPaginationProps = buildProps({
  ...nPaginationQueryProps,
  ...nPaginationRageProps,

  template: {
    type: definePropType<PaginationTemplate>(Object),
    default: () => ({
      nav: true,
      size: false,
    }),
  },

  total: Number,
  pageCount: Number,

  defaultPageSize: Number,
  defaultCurrentPage: Number,

  pagerCount: {
    type: Number,
    validator: (value: unknown) =>
      isNumber(value) && Math.trunc(value) === value && value > 4 && value < 22 && value % 2 === 1,
    default: 7,
  },

  prevText: {
    type: String,
    default: '',
  },
  prevIcon: {
    type: iconPropType,
    default: () => NIconArrowLeft,
  },
  nextText: {
    type: String,
    default: '',
  },
  nextIcon: {
    type: iconPropType,
    default: () => NIconArrowRight,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },

  // size
  pageSize: {
    type: Number,
  },
  pageSizes: {
    type: definePropType<number[]>(Array),
    default: () => mutable([10, 50, 100] as const),
  },
  popperClass: {
    type: String,
  },
  size: {
    type: String,
    values: componentSizes,
  },
} as const)
export type NPaginationProps = ExtractPropTypes<typeof nPaginationProps>
export type NPaginationQueryProps = ExtractPropTypes<typeof nPaginationQueryProps>

export const nPaginationEmits = {
  'update:current-page': (val: number) => isNumber(val),
  currentChange: (val: number) => isNumber(val),
  prevClick: (val: number) => isNumber(val),
  nextClick: (val: number) => isNumber(val),
}
export type NPaginationEmits = typeof nPaginationEmits
