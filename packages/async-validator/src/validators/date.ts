import { rules } from '../rules'
import type { ExecuteValidator } from '../types'
import { isEmptyValue } from '../utils'
import { canValidate } from './utils'

export const date: ExecuteValidator = (rule, value, callback, source, options) => {
  // console.log('integer rule called %j', rule);
  const errors: string[] = []

  if (!canValidate(rule, source)) {
    return callback(errors)
  }

  // console.log('validate on %s value', value);
  if (isEmptyValue(value, 'date') && !rule.required) {
    return callback()
  }

  rules.required(rule, value, source, errors, options)

  if (!isEmptyValue(value, 'date')) {
    const dateObject = value instanceof Date ? value : new Date(value)

    rules.type(rule, dateObject, source, errors, options)

    if (dateObject) {
      rules.range(rule, dateObject.getTime(), source, errors, options)
    }
  }

  callback(errors)
}
