import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NTh from './NTh.vue'
import type { NTableColumn, NTableColumnMap } from './types'

export const thProps = buildProps({
  isDisableClick: {
    type: Boolean,
    default: false,
  },
  options: {
    type: definePropType<{
      col: NTableColumn
      cols: NTableColumn[]
      colsMap: NTableColumnMap
      sort: (col: NTableColumn | NTableColumn['name']) => void
    }>(Object),
  },
} as const)

export const thEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  resizerDown: (evt: PointerEvent, columnName: string) => evt instanceof PointerEvent && !!columnName,
  orderDown: (evt: PointerEvent) => evt instanceof PointerEvent,
  pointerdown: (evt: PointerEvent) => evt instanceof PointerEvent,
} as const

export type NThProps = ExtractPropTypes<typeof thProps>
export type NThEmits = typeof thEmits
export type NThInstance = InstanceType<typeof NTh>
