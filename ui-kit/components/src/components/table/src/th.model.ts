import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { NTableColumn, NTableColumnMap } from './types'

export const nThProps = buildProps({
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

export type NThProps = ExtractPropTypes<typeof nThProps>
