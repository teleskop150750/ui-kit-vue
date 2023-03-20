import type {
  ExecuteValidator,
  InternalRuleItem,
  RuleItem,
  RuleValuePackageMap,
  ValidateValues,
  ValidatorRules,
} from '../../types'
import { format } from '../../utils'
import { validators } from '../../validators'

export function getSourceAndRulesMap(fields: string[], userSource: ValidateValues, rules: ValidatorRules) {
  const rulesMap: RuleValuePackageMap = {}
  let source = userSource

  fields.forEach((field) => {
    const fieldRules: RuleItem[] = rules[field]
    let value: unknown = source[field]

    fieldRules.forEach((fieldRule: RuleItem) => {
      const internalRule: InternalRuleItem = initInternalRuleItem(fieldRule)

      if (typeof internalRule.transform === 'function') {
        if (source === userSource) {
          source = { ...source }
        }

        source[field] = internalRule.transform(value)
        value = internalRule.transform(value)
      }

      // Fill validator. Skip if nothing need to validate
      internalRule.validator = getValidationMethod(internalRule)

      if (!internalRule.validator) {
        return
      }

      internalRule.field = field
      internalRule.fullField ||= field
      internalRule.type = getType(internalRule)

      rulesMap[field] ||= []
      rulesMap[field].push({
        rule: internalRule,
        value,
        source,
        field,
      })
    })
  })

  return { source, rulesMap }
}

function initInternalRuleItem(rule: InternalRuleItem | RuleItem['validator']): InternalRuleItem {
  if (typeof rule === 'function') {
    return {
      validator: rule,
    }
  }

  return { ...rule }
}

function getValidationMethod(rule: InternalRuleItem): RuleItem['validator'] | ExecuteValidator {
  if (typeof rule.validator === 'function') {
    return rule.validator
  }

  const ruleKeys = Object.keys(rule)
  const messageIndex = ruleKeys.indexOf('message')

  if (messageIndex !== -1) {
    ruleKeys.splice(messageIndex, 1)
  }

  if (ruleKeys.length === 1 && ruleKeys[0] === 'required') {
    return validators.required
  }

  return validators[getType(rule)]
}

function getType(rule: InternalRuleItem) {
  if (rule.type === undefined && rule.pattern instanceof RegExp) {
    rule.type = 'pattern'
  }

  if (typeof rule.validator !== 'function' && rule.type && !Object.hasOwn(validators, rule.type)) {
    throw new Error(format('Unknown rule type %s', rule.type))
  }

  return rule.type || 'string'
}
