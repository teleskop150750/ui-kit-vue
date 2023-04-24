import { componentSizes } from '@nado/ui-kit-constants'
import { buildProps, definePropType, isNumber, mutable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NPaginationSize from './NPaginationSize.vue'

export const nPaginationSizeProps = buildProps({
  pageSize: {
    type: Number,
    required: true,
  },
  pageSizes: {
    type: definePropType<number[]>(Array),
    default: () => mutable([10, 50, 100] as const),
  },
  popperClass: {
    type: String,
  },
  disabled: Boolean,
  size: {
    type: String,
    values: componentSizes,
  },
} as const)

export const nPaginationSizeEmits = {
  pageSizeChange: (val: number) => isNumber(val),
}

export type NPaginationSizeProps = ExtractPropTypes<typeof nPaginationSizeProps>

export type NPaginationSizeEmits = typeof nPaginationSizeEmits

export type NPaginationSizeInstance = InstanceType<typeof NPaginationSize>
