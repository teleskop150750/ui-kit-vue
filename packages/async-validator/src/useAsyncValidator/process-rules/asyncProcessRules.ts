import type { ProcessRule, RuleValuePackage, ValidateError } from '../../types'

export function asyncProcessRules(
  ruleList: RuleValuePackage[],
  processRule: ProcessRule,
  complete: (errors: ValidateError[]) => void,
) {
  const errors: ValidateError[] = []
  let currentRuleIndex = 0
  const lastRuleIndex = ruleList.length - 1

  function processNextRule(errors_: ValidateError[]) {
    currentRuleIndex += 1
    errors.push(...(errors_ || []))

    if (currentRuleIndex > lastRuleIndex) {
      complete(errors)
    }
  }

  ruleList.forEach((rule) => {
    processRule(rule, processNextRule)
  })
}
