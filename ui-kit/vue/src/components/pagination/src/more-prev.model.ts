import { buildProps, isNumber } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

import type MorePrev from './more-prev.vue'
import { nPaginationNavPageProps, nPaginationNavQueryProps } from './nav.model'

export const nPaginationNavMorePrevProps = buildProps({
  ...nPaginationNavPageProps,
  ...nPaginationNavQueryProps,
  disabled: {
    type: Boolean,
    required: true,
  },
  pagerCount: {
    type: Number,
    required: true,
  },
} as const)

export const nPaginationNavMorePrevEmits = {
  change: (val: number) => isNumber(val),
}

export type NPaginationNavMorePrevProps = ExtractPropTypes<typeof nPaginationNavMorePrevProps>

export type NPaginationNavMorePrevEmits = typeof nPaginationNavMorePrevEmits

export type NPaginationNavMorePrevInstance = InstanceType<typeof MorePrev>
