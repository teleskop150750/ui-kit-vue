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
  sort?: (a: NTableRowVal, b: NTableRowVal, rowA: NTableRow, rowB: NTableRow) => number
  format?: (val: NTableRowVal, row: NTableRow) => string | number
}

export interface SlotData {
  key: NTableRowKey
  row: NTableRow
  pageRowIndex: number
  col: NTableColumn
}

export interface BodyCellScopeData extends SlotData {
  value: NTableRowCellVal
}
