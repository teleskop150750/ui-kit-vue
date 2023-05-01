import { type FieldFilter, type FieldFilterBase, FieldFilterTypeMap } from '../field'
import { type FilterListIn, FilterListOperatorMap } from './filter'

export interface FieldFilterListBase extends FieldFilterBase {
  name: 'list'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: { IN: Array<string | number | Record<string, any>> }
}

export interface FieldFilterListIn extends FieldFilterListBase {
  type: 'list'
  value?: FilterListIn
}

export type FieldFilterList = FieldFilterListIn

export function assertFieldList(payload: FieldFilter): payload is FieldFilterList {
  return payload.type === FieldFilterTypeMap.LIST
}

export function assertFilterListInByOperation(field: FieldFilter, operation: string): field is FieldFilterListIn {
  return assertFieldList(field) && operation === FilterListOperatorMap.IN
}
