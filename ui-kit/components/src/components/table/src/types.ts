import type { NTableColumnSortOrder } from './hooks/useTableSort'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NTableRowVal = any
export type NTableRow = Record<string, NTableRowVal>
export type NTableRowKey = string | number
export type NTableRowCellVal = string | number

export interface NTableColumn {
  name: string
  width?: number
  label: string
  field: string | ((row: NTableRow) => string)

  required?: boolean
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  sortOrder?: NTableColumnSortOrder
  format?: (val: NTableRowVal, row: NTableRow) => string | number
}

export type NTableColumnInner = NTableColumn &
  Required<Pick<NTableColumn, 'align' | 'sortable' | 'sortOrder' | 'required'>>

export type NTableColumnMap = Record<string, NTableColumn>

export interface SlotData {
  key: NTableRowKey
  row: NTableRow
  pageRowIndex: number
  col: NTableColumn
}

export interface BodyCellScopeData extends SlotData {
  value: NTableRowCellVal
}

export interface NTableRequest {
  sort: {
    name: string
    order: 'ASC' | 'DESC'
  }[]
  page: number
  limit: number
}
