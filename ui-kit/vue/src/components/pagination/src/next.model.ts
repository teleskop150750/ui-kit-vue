import { buildProps, iconPropType } from '@ui/utils'
import { isNumber } from 'lodash-es'
import type { ExtractPropTypes } from 'vue'

import { nPaginationNavPageProps, nPaginationNavQueryProps } from './nav.model'
import type Next from './next.vue'

export const nPaginationNavNextProps = buildProps({
  ...nPaginationNavPageProps,
  ...nPaginationNavQueryProps,
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

export const nPaginationNavNextEmits = {
  change: (val: number) => isNumber(val),
}

export type NPaginationNavNextProps = ExtractPropTypes<typeof nPaginationNavNextProps>

export type NPaginationNavNextEmits = typeof nPaginationNavNextEmits

export type NPaginationNavNextInstance = InstanceType<typeof Next>
