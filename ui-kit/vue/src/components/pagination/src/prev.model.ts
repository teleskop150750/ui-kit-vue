import { buildProps, iconPropType, isNumber } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

import { nPaginationNavPageProps, nPaginationNavQueryProps } from './nav.model'
import type Prev from './prev.vue'

export const nPaginationPrevProps = buildProps({
  ...nPaginationNavPageProps,
  ...nPaginationNavQueryProps,
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

export const nPaginationNavPrevEmits = {
  change: (val: number) => isNumber(val),
}

export type NPaginationPrevProps = ExtractPropTypes<typeof nPaginationPrevProps>

export type NPaginationNavPrevEmits = typeof nPaginationNavPrevEmits

export type NPrevInstance = InstanceType<typeof Prev>
