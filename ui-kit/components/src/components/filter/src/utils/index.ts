import { type FieldFilter, FieldFilterTypeMap } from '../types'

export function getListFieldNames(fields: FieldFilter[]) {
  return [...fields].filter((el) => el.type === FieldFilterTypeMap.LIST).map((_el) => _el.name)
}
