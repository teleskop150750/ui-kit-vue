import { type FieldFilter, type FieldFilterBase, FieldFilterTypeMap } from '../field'
import { type FilterStringLike, FilterStringOperatorMap } from './filter'

export interface FieldFilterStringLike extends FieldFilterBase {
  type: 'string'
  value?: FilterStringLike
}

export type FieldFilterString = FieldFilterStringLike

export function assertFieldString(payload: FieldFilter): payload is FieldFilterString {
  return payload.type === FieldFilterTypeMap.STRING
}

export function assertFilterStringLikeByOperation(
  field: FieldFilter,
  operation: string,
): field is FieldFilterStringLike {
  return assertFieldString(field) && operation === FilterStringOperatorMap.LIKE
}
