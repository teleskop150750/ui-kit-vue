import { assertFieldDate, assertFieldList, assertFieldNumber, assertFieldString, type FilterField } from '../../types'

export function getFieldFilterValue(field: FilterField) {
  if (assertFieldString(field) && field.value && 'LIKE' in field.value) {
    return field.value?.LIKE
  }

  if (assertFieldNumber(field)) {
    if (field.value && 'EQ' in field.value) {
      return field.value.EQ
    }

    if (field.value && 'BTN' in field.value) {
      return field.value?.BTN
    }

    if (field.value && 'GTE' in field.value) {
      return field.value?.GTE
    }

    if (field.value && 'LTE' in field.value) {
      return field.value?.LTE
    }
  }

  if (assertFieldDate(field)) {
    if (field.value && 'EQ' in field.value) {
      return field.value.EQ
    }

    if (field.value && 'BETWEEN' in field.value) {
      return field.value?.BETWEEN
    }

    if (field.value && 'GTE' in field.value) {
      return field.value?.GTE
    }

    if (field.value && 'LTE' in field.value) {
      return field.value?.LTE
    }
  }

  if (assertFieldList(field) && field.value && 'IN' in field.value) {
    return field.value.IN
  }

  return undefined
}
