import type { ExecuteRule } from '../types'
import { format } from '../utils'

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param _source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
export const whitespace: ExecuteRule = (rule, value, _source, errors, options) => {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages?.whitespace || '', rule.fullField))
  }
}
