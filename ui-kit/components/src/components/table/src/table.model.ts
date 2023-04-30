import { buildProps, definePropType, isArray, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { nPaginationBaseProps } from '../../pagination'
import { useTableColumnProps } from './hooks'
import type NTable from './NTable.vue'
import type { NTableColumn, NTableColumnInner, NTableRequest, NTableRow, NTableRowKey } from './types'

export const nTableProps = buildProps({
  ...nPaginationBaseProps,
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
    type: definePropType<(evt: MouseEvent, row: NTableRow, rowIndexOnPage: number) => void>(Function),
  },
  onRowDblclick: {
    type: definePropType<(evt: MouseEvent, row: NTableRow, rowIndexOnPage: number) => void>(Function),
  },
  onRowContextmenu: {
    type: definePropType<(evt: MouseEvent, row: NTableRow, rowIndexOnPage: number) => void>(Function),
  },
})

export const nTableEmits = {
  'update:columns': (val: Array<NTableColumnInner>) => isArray(val),
  'update:current-page': (val: number) => isNumber(val),
  'update:page-size': (val: number) => isNumber(val),
  request: (val: NTableRequest) => !!val,
  rowClick: (evt: Event, row: NTableRow, rowIndexOnPage: number) => !!evt && !!row && !!rowIndexOnPage,
  rowDblclick: (evt: Event, row: NTableRow, rowIndexOnPage: number) => !!evt && !!row && !!rowIndexOnPage,
  rowContextmenu: (evt: Event, row: NTableRow, rowIndexOnPage: number) => !!evt && !!row && !!rowIndexOnPage,
}

export type NTableProps = ExtractPropTypes<typeof nTableProps>
export type NTableEmits = typeof nTableEmits
export type NTableInstance = ExtractPropTypes<typeof NTable>
