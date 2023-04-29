import { type FieldFilter, type FieldFilterBase, FieldFilterTypeMap } from '../field'
import {
  type FilterNumberAny,
  type FilterNumberBtw,
  type FilterNumberEmpty,
  type FilterNumberEq,
  type FilterNumberFilled,
  type FilterNumberGte,
  type FilterNumberLte,
  FilterNumberOperatorMap,
} from './filter'

export interface FieldFilterNumberAny extends FieldFilterBase {
  type: 'number'
  value?: FilterNumberAny
}

export interface FieldFilterNumberFilled extends FieldFilterBase {
  type: 'number'
  value?: FilterNumberFilled
}

export interface FieldFilterNumberEmpty extends FieldFilterBase {
  type: 'number'
  value?: FilterNumberEmpty
}

export interface FieldFilterNumberEq extends FieldFilterBase {
  type: 'number'
  value?: FilterNumberEq
}

export interface FieldFilterNumberGte extends FieldFilterBase {
  type: 'number'
  value?: FilterNumberGte
}

export interface FieldFilterNumberLte extends FieldFilterBase {
  type: 'number'
  value?: FilterNumberLte
}

export interface FieldFilterNumberBtw extends FieldFilterBase {
  type: 'number'
  value?: FilterNumberBtw
}

export type FieldFilterNumber =
  | FieldFilterNumberAny
  | FieldFilterNumberFilled
  | FieldFilterNumberEmpty
  | FieldFilterNumberEq
  | FieldFilterNumberGte
  | FieldFilterNumberLte
  | FieldFilterNumberBtw

export function assertFieldNumber(payload: FieldFilter): payload is FieldFilterNumber {
  return payload.type === FieldFilterTypeMap.NUMBER
}

export function assertFilterNumberAnyByOperation(field: FieldFilter, operation: string): field is FieldFilterNumberAny {
  return assertFieldNumber(field) && operation === FilterNumberOperatorMap.ANY
}

export function assertFilterNumberFilledByOperation(
  field: FieldFilter,
  operation: string,
): field is FieldFilterNumberFilled {
  return assertFieldNumber(field) && operation === FilterNumberOperatorMap.FILLED
}

export function assertFilterNumberEmptyByOperation(
  field: FieldFilter,
  operation: string,
): field is FieldFilterNumberEmpty {
  return assertFieldNumber(field) && operation === FilterNumberOperatorMap.EMPTY
}

export function assertFilterNumberEqByOperation(field: FieldFilter, operation: string): field is FieldFilterNumberEq {
  return assertFieldNumber(field) && operation === FilterNumberOperatorMap.EQ
}

export function assertFilterNumberGteByOperation(field: FieldFilter, operation: string): field is FieldFilterNumberGte {
  return assertFieldNumber(field) && operation === FilterNumberOperatorMap.GTE
}

export function assertFilterNumberLteByOperation(field: FieldFilter, operation: string): field is FieldFilterNumberLte {
  return assertFieldNumber(field) && operation === FilterNumberOperatorMap.LTE
}

export function assertFilterNumberBtwByOperation(field: FieldFilter, operation: string): field is FieldFilterNumberBtw {
  return assertFieldNumber(field) && operation === FilterNumberOperatorMap.BTW
}
