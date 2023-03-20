import { rules } from '../rules'
import type { ExecuteValidator } from '../types'
import { isEmptyValue } from '../utils'
import { canValidate } from './utils'

export const any: ExecuteValidator = (rule, value, callback, source, options) => {
  const errors: string[] = []

  if (!canValidate(rule, source)) {
    return callback(errors)
  }

  if (isEmptyValue(value) && !rule.required) {
    return callback()
  }

  rules.required(rule, value, source, errors, options)

  callback(errors)
}
