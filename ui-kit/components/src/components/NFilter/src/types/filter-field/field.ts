import type { FieldFilterDate } from './date'
import type { FieldFilterList } from './list'
import type { FieldFilterNumber } from './number'
import type { FieldFilterString } from './string'

export const FieldFilterTypeMap = {
  STRING: 'string',
  NUMBER: 'number',
  DATE: 'date',
  LIST: 'list',
}

export type FieldFilterType = (typeof FieldFilterTypeMap)[keyof typeof FieldFilterTypeMap]

export interface FieldFilterBase {
  name: string
  label: string
}

export type FieldFilter = FieldFilterString | FieldFilterNumber | FieldFilterDate | FieldFilterList
