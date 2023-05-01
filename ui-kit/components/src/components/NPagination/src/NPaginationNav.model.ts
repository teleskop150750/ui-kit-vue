import { buildProps, iconPropType, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { paginationQueryProps } from './NPagination.model'
import type NPaginationNav from './NPaginationNav.vue'

export const paginationNavQueryProps = buildProps({
  queryType: {
    ...paginationQueryProps.queryType,
  },
  pageNumberOrOffsetQueryParamName: {
    type: String,
    required: true,
  },
  pageSizeQueryParamName: {
    type: String,
    required: true,
  },
} as const)

export const paginationNavPageProps = buildProps({
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
  ...paginationNavQueryProps,
  ...paginationNavPageProps,
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
  click: (val: number) => isNumber(val),
  prevClick: (val: number) => isNumber(val),
  nextClick: (val: number) => isNumber(val),
}

export type NPaginationNavProps = ExtractPropTypes<typeof nPaginationNavProps>
export type NPaginationNavQueryProps = ExtractPropTypes<typeof paginationNavQueryProps>

export type NPaginationNavEmits = typeof nPaginationNavEmits

export type NPaginationNavInstance = InstanceType<typeof NPaginationNav>
