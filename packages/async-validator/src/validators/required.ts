import { rules } from '../rules'
import type { ExecuteValidator } from '../types'

export const required: ExecuteValidator = (rule, value, callback, source, options) => {
  const errors: string[] = []
  const type = Array.isArray(value) ? 'array' : typeof value

  rules.required(rule, value, source, errors, options, type)
  callback(errors)
}
