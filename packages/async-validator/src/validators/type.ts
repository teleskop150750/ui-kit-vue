import { rules } from '../rules'
import type { ExecuteValidator } from '../types'
import { isEmptyValue } from '../utils'
import { canValidate } from './utils'

export const type: ExecuteValidator = (rule, value, callback, source, options) => {
  const ruleType = rule.type
  const errors: string[] = []

  if (!canValidate(rule, source)) {
    return callback(errors)
  }

  if (isEmptyValue(value, ruleType) && !rule.required) {
    return callback()
  }

  rules.required(rule, value, source, errors, options, ruleType)

  if (!isEmptyValue(value, ruleType)) {
    rules.type(rule, value, source, errors, options)
  }

  callback(errors)
}
