import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NTd from './NTd.vue'
import type { NTableColumn, NTableColumnMap } from './types'

export const tdProps = buildProps({
  key: {
    type: definePropType<string>(String),
  },
  col: {
    type: definePropType<NTableColumn>(Object),
  },
  cols: {
    type: definePropType<NTableColumn[]>(Array),
  },
  colsMap: {
    type: definePropType<NTableColumnMap>(Object),
  },
} as const)

export type NTdProps = ExtractPropTypes<typeof tdProps>
export type NTdInstance = InstanceType<typeof NTd>
