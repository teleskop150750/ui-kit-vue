import { buildProps, iconPropType, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Prev from './NPaginationNavPrev.vue'
import { nPaginationNavPageProps, nPaginationNavQueryProps } from './pagination-nav.model'

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
