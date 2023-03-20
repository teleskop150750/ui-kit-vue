import type { ValidateValue } from '../../types'
import { isNativeStringType } from './isNativeStringType'

export function isEmptyValue(value: ValidateValue, type?: string) {
  if (value === undefined || value === null) {
    return true
  }

  if (type === 'array' && Array.isArray(value) && value.length === 0) {
    return true
  }

  if (isNativeStringType(type as string) && typeof value === 'string' && !value) {
    return true
  }

  return false
}
