import type { ExecuteRule } from '../types'
import { format, isEmptyValue } from '../utils'

export const required: ExecuteRule = (rule, value, source, errors, options, type) => {
  if (
    rule.required &&
    (rule.field === undefined || !Object.hasOwn(source, rule.field) || isEmptyValue(value, type || rule.type))
  ) {
    errors.push(format(options.messages?.required || '', rule.fullField))
  }
}
