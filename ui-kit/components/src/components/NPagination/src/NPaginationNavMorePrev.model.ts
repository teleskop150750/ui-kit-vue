import { buildProps, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { paginationNavPageProps, paginationNavQueryProps } from './NPaginationNav.model'
import type MorePrev from './NPaginationNavMorePrev.vue'

export const paginationNavMorePrevProps = buildProps({
  ...paginationNavPageProps,
  ...paginationNavQueryProps,
  disabled: {
    type: Boolean,
    required: true,
  },
  pagerCount: {
    type: Number,
    required: true,
  },
} as const)

export const paginationNavMorePrevEmits = {
  change: (val: number) => isNumber(val),
} as const

export type NPaginationNavMorePrevProps = ExtractPropTypes<typeof paginationNavMorePrevProps>
export type NPaginationNavMorePrevEmits = typeof paginationNavMorePrevEmits
export type NPaginationNavMorePrevInstance = InstanceType<typeof MorePrev>
