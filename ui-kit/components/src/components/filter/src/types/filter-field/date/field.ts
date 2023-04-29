import { type FieldFilter, type FieldFilterBase, FieldFilterTypeMap } from '../field'
import {
  type FilterDateAny,
  type FilterDateBtw,
  type FilterDateEmpty,
  type FilterDateEq,
  type FilterDateFilled,
  type FilterDateGte,
  type FilterDateLte,
  FilterDateOperatorMap,
} from './filter'

export interface FieldFilterDateAny extends FieldFilterBase {
  type: 'date'
  value?: FilterDateAny
}

export interface FieldFilterDateFilled extends FieldFilterBase {
  type: 'date'
  value?: FilterDateFilled
}

export interface FieldFilterDateEmpty extends FieldFilterBase {
  type: 'date'
  value?: FilterDateEmpty
}

export interface FieldFilterDateEq extends FieldFilterBase {
  type: 'date'
  value?: FilterDateEq
}

export interface FieldFilterDateGte extends FieldFilterBase {
  type: 'date'
  value?: FilterDateGte
}

export interface FieldFilterDateLte extends FieldFilterBase {
  type: 'date'
  value?: FilterDateLte
}

export interface FieldFilterDateBtw extends FieldFilterBase {
  type: 'date'
  value?: FilterDateBtw
}

export type FieldFilterDate =
  | FieldFilterDateAny
  | FieldFilterDateFilled
  | FieldFilterDateEmpty
  | FieldFilterDateEq
  | FieldFilterDateGte
  | FieldFilterDateLte
  | FieldFilterDateBtw

export function assertFieldDate(payload: FieldFilter): payload is FieldFilterDate {
  return payload.type === FieldFilterTypeMap.DATE
}

export function assertFilterDateAnyByOperation(field: FieldFilter, operation: string): field is FieldFilterDateAny {
  return assertFieldDate(field) && operation === FilterDateOperatorMap.ANY
}

export function assertFilterDateFilledByOperation(
  field: FieldFilter,
  operation: string,
): field is FieldFilterDateFilled {
  return assertFieldDate(field) && operation === FilterDateOperatorMap.FILLED
}

export function assertFilterDateEmptyByOperation(field: FieldFilter, operation: string): field is FieldFilterDateEmpty {
  return assertFieldDate(field) && operation === FilterDateOperatorMap.EMPTY
}

export function assertFilterDateEqByOperation(field: FieldFilter, operation: string): field is FieldFilterDateEq {
  return assertFieldDate(field) && operation === FilterDateOperatorMap.EQ
}

export function assertFilterDateGteByOperation(field: FieldFilter, operation: string): field is FieldFilterDateGte {
  return assertFieldDate(field) && operation === FilterDateOperatorMap.GTE
}

export function assertFilterDateLteByOperation(field: FieldFilter, operation: string): field is FieldFilterDateLte {
  return assertFieldDate(field) && operation === FilterDateOperatorMap.LTE
}

export function assertFilterDateBtwByOperation(field: FieldFilter, operation: string): field is FieldFilterDateBtw {
  return assertFieldDate(field) && operation === FilterDateOperatorMap.BTW
}
