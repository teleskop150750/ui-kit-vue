import { buildProps, iconPropType, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { paginationNavPageProps, paginationNavQueryProps } from './NPaginationNav.model'
import type NPaginationNavPrev from './NPaginationNavPrev.vue'

export const paginationPrevProps = buildProps({
  ...paginationNavPageProps,
  ...paginationNavQueryProps,
  disabled: {
    type: Boolean,
    required: true,
  },
  prevText: {
    type: String,
  },
  prevIcon: {
    type: iconPropType,
  },
} as const)

export const paginationNavPrevEmits = {
  change: (val: number) => isNumber(val),
} as const

export type NPaginationNavPrevProps = ExtractPropTypes<typeof paginationPrevProps>
export type NPaginationNavPrevEmits = typeof paginationNavPrevEmits
export type NPaginationNavPrevInstance = InstanceType<typeof NPaginationNavPrev>
