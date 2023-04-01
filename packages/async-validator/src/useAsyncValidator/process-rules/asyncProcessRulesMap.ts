import { AsyncValidationError } from '../../errors'
import type { ProcessRule, RuleValuePackageMap, ValidateError, ValidateOption, ValidateValues } from '../../types'
import { fieldsErrorListToMap } from '../../utils/error/convertFieldsError'
import { asyncProcessRules } from './asyncProcessRules'
import { asyncProcessRulesBeforeFistError } from './asyncProcessRulesBeforeFistError'
import { rulesMapToList } from './utils/rulesMapToList'

export function asyncProcessRulesMap(
  rulesMap: RuleValuePackageMap,
  option: ValidateOption,
  processRule: ProcessRule,
  callback: (errors: ValidateError[]) => void,
  source: ValidateValues,
): Promise<ValidateValues> {
  if (option.first) {
    return processRulesBeforeFistErrorWrap(rulesMap, processRule, callback, source)
  }

  return processRulesWrap(rulesMap, option, processRule, callback, source)
}

function processRulesBeforeFistErrorWrap(
  rulesMap: RuleValuePackageMap,
  validateRule: ProcessRule,
  callback: (errors: ValidateError[]) => void,
  source: ValidateValues,
) {
  const promise = new Promise<ValidateValues>((resolve, reject) => {
    function complete(errors: ValidateError[]) {
      callback(errors)

      if (errors.length > 0) {
        reject(new AsyncValidationError(errors, fieldsErrorListToMap(errors)))
      }

      resolve(source)
    }

    const ruleList = rulesMapToList(rulesMap)

    asyncProcessRulesBeforeFistError(ruleList, validateRule, complete)
  })

  promise.catch((error) => error)

  return promise
}

function processRulesWrap(
  rulesMap: RuleValuePackageMap,
  option: ValidateOption,
  processRule: ProcessRule,
  callback: (errors: ValidateError[]) => void,
  source: ValidateValues,
) {
  const firstFields = option.firstFields === true ? Object.keys(rulesMap) : option.firstFields || []

  const fields = Object.keys(rulesMap)
  const lastRuleIndex = fields.length
  let ruleIndex = 0
  const errors: ValidateError[] = []

  const promise = new Promise<ValidateValues>((resolve, reject) => {
    if (lastRuleIndex === 0) {
      callback(errors)
      resolve(source)
    }

    function complete(errors_: ValidateError[]) {
      errors.push(...errors_)
      ruleIndex += 1

      if (ruleIndex !== lastRuleIndex) {
        return
      }

      callback(errors)

      if (errors_.length > 0) {
        reject(new AsyncValidationError(errors, fieldsErrorListToMap(errors)))
      }

      resolve(source)
    }

    fields.forEach((field) => {
      const fieldRules = rulesMap[field]!

      if (firstFields.includes(field)) {
        asyncProcessRulesBeforeFistError(fieldRules, processRule, complete)
      } else {
        asyncProcessRules(fieldRules, processRule, complete)
      }
    })
  })

  promise.catch((error) => error)

  return promise
}
