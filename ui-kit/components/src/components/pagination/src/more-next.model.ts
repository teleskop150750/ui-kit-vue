import { buildProps, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type MoreNext from './more-next.vue'
import { nPaginationNavPageProps, nPaginationNavQueryProps } from './nav.model'

export const nPaginationNavMoreNextProps = buildProps({
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

export const nPaginationNavMoreNextEmits = {
  change: (val: number) => isNumber(val),
}

export type NPaginationNavMoreNextProps = ExtractPropTypes<typeof nPaginationNavMoreNextProps>

export type NPaginationNavMoreNextEmits = typeof nPaginationNavMoreNextEmits

export type NPaginationNavMoreNextInstance = InstanceType<typeof MoreNext>
