import { buildProps, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type MorePrev from './NPaginationNavMorePrev.vue'
import { nPaginationNavPageProps, nPaginationNavQueryProps } from './pagination-nav.model'

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
