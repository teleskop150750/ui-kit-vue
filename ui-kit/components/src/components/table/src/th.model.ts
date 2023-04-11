import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NTh from './NTh.vue'
import type { NTableColumn, NTableColumnMap } from './types'

export const nThProps = buildProps({
  options: {
    type: definePropType<{
      col: NTableColumn
      cols: NTableColumn[]
      colsMap: NTableColumnMap
      sort: (col: NTableColumn | NTableColumn['name']) => void
    }>(Object),
  },
} as const)

export const nThEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type NThProps = ExtractPropTypes<typeof nThProps>
export type NThEmits = typeof nThEmits
export type NThInstance = InstanceType<typeof NTh>
