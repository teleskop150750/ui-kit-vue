import type { Rule, RulesMap, ValidatorRules } from '../../types'

export function formatUserRules(userRules: RulesMap) {
  const rules: ValidatorRules = {}

  Object.keys(userRules).forEach((name) => {
    const rule: Rule = userRules[name]

    rules[name] = Array.isArray(rule) ? rule : [rule]
  })

  return rules
}
