import type { InternalRuleItem, RuleCallback, RuleValuePackage, ValidateOption, ValidateResult } from '../../types'

export function innerProcessRule(rulePackage: RuleValuePackage, cb: RuleCallback, options: ValidateOption) {
  const { rule, value, source } = rulePackage
  let res: ValidateResult

  if (rule.asyncValidator) {
    res = rule.asyncValidator(rule, value, cb, source, options)

    if (res && (res as Promise<void>).then) {
      // eslint-disable-next-line promise/no-callback-in-promise
      ;(res as Promise<void>).then(() => setTimeout(() => cb(), 0)).catch((error) => setTimeout(() => cb(error), 0))
    }

    return
  }

  if (rule.validator) {
    try {
      res = rule.validator(rule, value, cb, source, options)
    } catch (error) {
      console.error?.(error)

      // rethrow to report error
      if (!options.suppressValidatorError) {
        setTimeout(() => {
          throw error
        }, 0)
      }

      cb((error as Error).message)
    }

    callCb(res, rule, cb)
  }
}

function callCb(res: ValidateResult, rule: InternalRuleItem, cb: RuleCallback) {
  if (res === true) {
    cb()
  } else if (res === false) {
    cb(getRuleMessage(rule))
  } else if (Array.isArray(res)) {
    cb(res)
  } else if (res instanceof Error) {
    cb(res.message)
  }
}

function getRuleMessage(rule: InternalRuleItem) {
  if (typeof rule.message === 'function') {
    return rule.message(rule.fullField || rule.field)
  }

  return rule.message || `${rule.fullField || rule.field} fails`
}
