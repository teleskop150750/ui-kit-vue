import type { InternalRuleItem } from '../../types'

export function isDeepRule(internalRule: InternalRuleItem, value: any) {
  const isDeepType = internalRule.type === 'object' || internalRule.type === 'array'
  const isDeepFields = typeof internalRule.fields === 'object' || typeof internalRule.defaultField === 'object'
  const result = isDeepType && isDeepFields

  return result ? internalRule.required || (!internalRule.required && value) : false
}
