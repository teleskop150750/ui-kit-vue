import type { ValidatorRules } from '../../types'

export function hasRules(rules: ValidatorRules) {
  return rules || Object.keys(rules).length === 0
}
