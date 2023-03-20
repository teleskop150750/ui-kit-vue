import { rules } from '../rules'
import type { ExecuteValidator } from '../types'
import { canValidate } from './utils'

export const array: ExecuteValidator = (rule, value, callback, source, options) => {
  const errors: string[] = []

  if (!canValidate(rule, source)) {
    return callback(errors)
  }

  if ((value === undefined || value === null) && !rule.required) {
    return callback()
  }

  rules.required(rule, value, source, errors, options, 'array')

  if (value !== undefined && value !== null) {
    rules.type(rule, value, source, errors, options)
    rules.range(rule, value, source, errors, options)
  }

  callback(errors)
}
