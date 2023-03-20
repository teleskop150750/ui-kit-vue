import type { ExecuteRule } from '../types'
import { format } from '../utils'

const ENUM = 'enum' as const

export const enumerable: ExecuteRule = (rule, value, _source, errors, options) => {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : []

  if (!rule[ENUM].includes(value)) {
    errors.push(format(options.messages?.[ENUM] || '', rule.fullField, rule[ENUM].join(', ')))
  }
}
