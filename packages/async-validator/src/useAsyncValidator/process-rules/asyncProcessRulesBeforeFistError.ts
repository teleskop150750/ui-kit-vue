import type { ProcessRule, RuleValuePackage, ValidateError } from '../../types'

export function asyncProcessRulesBeforeFistError(
  rulesList: RuleValuePackage[],
  processRule: ProcessRule,
  complete: (errors: ValidateError[]) => void,
) {
  let ruleIndex = 0
  const lastRuleIndex = rulesList.length - 1

  function processNextRule(errors: ValidateError[]) {
    if (errors && errors.length > 0) {
      complete(errors)

      return
    }

    const currRuleIndex = ruleIndex

    ruleIndex += 1

    if (currRuleIndex > lastRuleIndex) {
      complete([])

      return
    }

    processRule(rulesList[currRuleIndex], processNextRule)
  }

  processNextRule([])
}
