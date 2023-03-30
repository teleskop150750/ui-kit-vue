import { buildProps, iconPropType, isNumber } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

import type Pager from './nav.vue'
import { nPaginationQueryProps } from './pagination.model'

export const nPaginationNavQueryProps = buildProps({
  queryType: {
    ...nPaginationQueryProps.queryType,
    required: true,
  },
  pageNumberQueryParamName: {
    type: String,
    required: true,
  },
  pageSizeQueryParamName: {
    type: String,
    required: true,
  },
} as const)

export const nPaginationNavPageProps = buildProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
} as const)

export const nPaginationNavProps = buildProps({
  ...nPaginationNavQueryProps,
  ...nPaginationNavPageProps,
  pagerCount: {
    type: Number,
    default: 7,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  nextText: {
    type: String,
  },
  nextIcon: {
    type: iconPropType,
  },
  prevText: {
    type: String,
  },
  prevIcon: {
    type: iconPropType,
  },
} as const)

export const nPaginationNavEmits = {
  change: (val: number) => isNumber(val),
  prevClick: (val: number) => isNumber(val),
  nextClick: (val: number) => isNumber(val),
}

export type NPaginationNavProps = ExtractPropTypes<typeof nPaginationNavProps>
export type NPaginationNavQueryProps = ExtractPropTypes<typeof nPaginationNavQueryProps>

export type NPaginationNavEmits = typeof nPaginationNavEmits

export type NPaginationNavInstance = InstanceType<typeof Pager>
