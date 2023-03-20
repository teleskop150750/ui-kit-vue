import type { InternalRuleItem, ValidateValues } from '../../types'

export function canValidate(rule: InternalRuleItem, source: ValidateValues) {
  return rule.required || (!rule.required && rule.field !== undefined && Object.hasOwn(source, rule.field))
}
