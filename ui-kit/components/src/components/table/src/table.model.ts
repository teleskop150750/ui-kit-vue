/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { useTableColumnProps } from './hooks'
import type { NTableColumn, NTableRow, NTableRowKey } from './types'

export const nTableProps = buildProps({
  ...useTableColumnProps,
  rowKey: {
    type: definePropType<NTableRowKey | ((row: NTableRow) => NTableRowKey)>([String, Function]),
    default: 'id',
  },
  rows: {
    type: definePropType<NTableRow[]>(Array),
    default: () => [],
  },
  columns: {
    type: definePropType<NTableColumn[] | undefined>(Array),
    default: undefined,
  },
  onRowClick: {
    type: definePropType<(evt: MouseEvent, row: NTableRow, pageIndex: number) => void>(Function),
  },
  onRowDblclick: {
    type: definePropType<(evt: MouseEvent, row: NTableRow, pageIndex: number) => void>(Function),
  },
  onRowContextmenu: {
    type: definePropType<(evt: MouseEvent, row: NTableRow, pageIndex: number) => void>(Function),
  },
})

export const nTableEmits = {
  request: (val: any) => !!val,
  rowClick: (evt: Event, row: NTableRow, pageIndex: number) => !!evt && !!row && !!pageIndex,
}

export type NTableEmits = typeof nTableEmits

export type NTableProps = ExtractPropTypes<typeof nTableProps>
