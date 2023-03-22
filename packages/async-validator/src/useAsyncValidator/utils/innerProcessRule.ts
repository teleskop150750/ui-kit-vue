import type { InternalRuleItem, RuleCallback, RuleValuePackage, ValidateOption, ValidateResult } from '../../types'

export function innerProcessRule(rulePackage: RuleValuePackage, ruleCb: RuleCallback, options: ValidateOption) {
  const { rule, value, source } = rulePackage
  let result: ValidateResult

  if (rule.asyncValidator) {
    result = rule.asyncValidator(rule, value, ruleCb, source, options)
  } else if (rule.validator) {
    try {
      result = rule.validator(rule, value, ruleCb, source, options)
    } catch (error) {
      if (options.suppressConsole === false) {
        console.error?.(error)
      }

      // rethrow to report error
      if (!options.suppressValidatorError) {
        setTimeout(() => {
          throw error
        }, 0)
      }

      ruleCb((error as Error).message)
    }

    callCb(result, rule, ruleCb)
  }

  if (result && (result as Promise<void>).then) {
    ;(result as Promise<void>)
      .then(() => setTimeout(() => ruleCb(), 0))
      .catch((error) => setTimeout(() => ruleCb(error), 0))
  }
}

function callCb(res: ValidateResult, rule: InternalRuleItem, ruleCb: RuleCallback) {
  if (res === true) {
    ruleCb()
  } else if (res === false) {
    ruleCb(getRuleMessage(rule))
  } else if (Array.isArray(res)) {
    ruleCb(res)
  } else if (res instanceof Error) {
    ruleCb(res.message)
  }
}

function getRuleMessage(rule: InternalRuleItem) {
  if (typeof rule.message === 'function') {
    return rule.message(rule.fullField || rule.field)
  }

  return rule.message || `${rule.fullField || rule.field} fails`
}
