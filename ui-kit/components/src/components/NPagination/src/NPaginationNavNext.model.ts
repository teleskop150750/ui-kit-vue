import { buildProps, iconPropType, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { paginationNavPageProps, paginationNavQueryProps } from './NPaginationNav.model'
import type Next from './NPaginationNavNext.vue'

export const paginationNavNextProps = buildProps({
  ...paginationNavPageProps,
  ...paginationNavQueryProps,
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
} as const)

export const paginationNavNextEmits = {
  change: (val: number) => isNumber(val),
} as const

export type NPaginationNavNextProps = ExtractPropTypes<typeof paginationNavNextProps>
export type NPaginationNavNextEmits = typeof paginationNavNextEmits
export type NPaginationNavNextInstance = InstanceType<typeof Next>
