import { buildProps, definePropType } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

import type { NTableColumn, NTableColumnMap } from './types'

export const nTdProps = buildProps({
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
})

export type NTdProps = ExtractPropTypes<typeof nTdProps>
