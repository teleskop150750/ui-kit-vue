import { rules } from '../rules'
import type { ExecuteValidator } from '../types'
import { isEmptyValue } from '../utils'
import { canValidate } from './utils'

export const pattern: ExecuteValidator = (rule, value, callback, source, options) => {
  const errors: string[] = []

  if (!canValidate(rule, source)) {
    return callback(errors)
  }

  if (isEmptyValue(value, 'string') && !rule.required) {
    return callback()
  }

  rules.required(rule, value, source, errors, options)

  if (!isEmptyValue(value, 'string')) {
    rules.pattern(rule, value, source, errors, options)
  }

  callback(errors)
}
