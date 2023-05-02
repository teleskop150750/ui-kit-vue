import { buildProps, definePropType, isArray, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { paginationBaseProps } from '../../NPagination'
import { useTableColumnProps } from './hooks'
import type NTable from './NTable.vue'
import type { NTableColumn, NTableColumnInner, NTableRequest, NTableRow, NTableRowKey } from './types'

export const tableProps = buildProps({
  ...paginationBaseProps,
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
} as const)

export const tableEmits = {
  'update:columns': (val: Array<NTableColumnInner>) => isArray(val),
  'update:current-page': (val: number) => isNumber(val),
  'update:page-size': (val: number) => isNumber(val),
  updateSize: (val: Array<NTableColumnInner>) => isArray(val),
  updateOrder: (val: Array<NTableColumnInner>) => isArray(val),
  updateSort: (val: Array<NTableColumnInner>) => isArray(val),
  request: (_val: NTableRequest) => true,
  rowClick: (evt: Event, row: NTableRow, rowIndexOnPage: number) => !!evt && !!row && !!rowIndexOnPage,
  rowDblclick: (evt: Event, row: NTableRow, rowIndexOnPage: number) => !!evt && !!row && !!rowIndexOnPage,
  rowContextmenu: (evt: Event, row: NTableRow, rowIndexOnPage: number) => !!evt && !!row && !!rowIndexOnPage,
} as const

export type NTableProps = ExtractPropTypes<typeof tableProps>
export type NTableEmits = typeof tableEmits
export type NTableInstance = ExtractPropTypes<typeof NTable>
