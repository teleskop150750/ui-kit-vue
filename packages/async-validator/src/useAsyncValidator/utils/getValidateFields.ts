import type { ValidateOption, ValidatorRules } from '../../types'

export function getValidateFields(options: ValidateOption, rules: ValidatorRules) {
  return options.keys || Object.keys(rules)
}
