import { buildProps, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { paginationNavPageProps, paginationNavQueryProps } from './NPaginationNav.model'
import type MoreNext from './NPaginationNavMoreNext.vue'

export const paginationNavMoreNextProps = buildProps({
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

export const paginationNavMoreNextEmits = {
  change: (val: number) => isNumber(val),
} as const

export type NPaginationNavMoreNextProps = ExtractPropTypes<typeof paginationNavMoreNextProps>
export type NPaginationNavMoreNextEmits = typeof paginationNavMoreNextEmits
export type NPaginationNavMoreNextInstance = InstanceType<typeof MoreNext>
