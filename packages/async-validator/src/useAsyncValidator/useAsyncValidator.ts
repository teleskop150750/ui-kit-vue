import { messages as defaultMessagesThere, newMessages } from '../messages'
import type {
  Arrayable,
  ExecuteValidator,
  InternalValidateMessages,
  RuleItem,
  RulesMap,
  RuleValuePackage,
  SyncErrorType,
  ValidateError,
  ValidateMessages,
  ValidateParams,
  ValidatorRules,
} from '../types'
import { complementError, deepMerge, format, warning as warning_ } from '../utils'
import { validators as validators_ } from '../validators'
import { asyncProcessRulesMap } from './process-rules'
import {
  callUserCallback,
  formatUserRules,
  getOptionsWithMessages,
  getSourceAndRulesMap,
  hasRules,
  innerProcessRule,
  isDeepRule,
} from './utils'
import { getValidateFields } from './utils/getValidateFields'

export function useAsyncValidator({ warning: userWarning = warning_.value } = {}) {
  let defaultMessages: InternalValidateMessages = defaultMessagesThere
  const warning = userWarning
  const validators = validators_

  function messages(messagesThere?: ValidateMessages) {
    if (messagesThere) {
      defaultMessages = deepMerge(newMessages(), messagesThere)
    }

    return defaultMessages
  }

  function register(type: string, validator: ExecuteValidator) {
    validators[type] = validator
  }

  function useSchema(userRules: RulesMap) {
    const rules: ValidatorRules = formatUserRules(userRules)

    function validateWithOptions(
      source: ValidateParams['source'],
      options: ValidateParams['options'] = {},
      callback: ValidateParams['callback'] = () => {},
    ) {
      return innerValidate({
        source,
        options,
        callback,
      })
    }

    function validate(source: ValidateParams['source'], callback: ValidateParams['callback'] = () => {}) {
      return innerValidate({
        source,
        callback,
      })
    }

    function innerValidate({ source: userSource, options: userOptions = {}, callback = () => {} }: ValidateParams) {
      if (!hasRules(rules)) {
        callback(undefined, { ...userSource })

        return Promise.resolve({ ...userSource })
      }

      const options = getOptionsWithMessages(defaultMessages, userOptions)
      const fields = getValidateFields(options, rules)
      const { source, rulesMap } = getSourceAndRulesMap(fields, userSource, rules)

      return asyncProcessRulesMap(
        rulesMap,
        options,
        (rulePackage: RuleValuePackage, finishOrProcessNextRule: (errors: ValidateError[]) => void) => {
          const { rule: innerRule, value, field } = rulePackage

          innerRule.field = field

          function addFullField(key: string, ruleItem: RuleItem) {
            return {
              ...ruleItem,
              fullField: `${innerRule.fullField}.${key}`,
              fullFields: innerRule.fullFields ? [...innerRule.fullFields, key] : [key],
            }
          }

          function ruleCb(error: Arrayable<SyncErrorType> = []) {
            let errorList = Array.isArray(error) ? error : [error]

            if (!options.suppressWarning && errorList.length > 0) {
              warning('async-validator:', errorList)
            }

            if (errorList.length > 0 && innerRule.message !== undefined) {
              errorList = [innerRule.message].flat() as string[]
            }

            // Fill error info
            let validateErrors: ValidateError[] = errorList.map(complementError(innerRule, source))

            if (options.first && validateErrors.length > 0) {
              return finishOrProcessNextRule(validateErrors)
            }

            if (!isDeepRule(innerRule, value)) {
              finishOrProcessNextRule(validateErrors)

              return
            }

            // if rule is required but the target object
            // does not exist fail at the rule level and don't
            // go deeper
            if (innerRule.required && !value) {
              if (innerRule.message !== undefined) {
                validateErrors = [innerRule.message].flat().map(complementError(innerRule, source))
              } else if (options.error) {
                validateErrors = [options.error(innerRule, format(options.messages?.required || '', innerRule.field))]
              }

              return finishOrProcessNextRule(validateErrors)
            }

            let fieldRuleMap: RulesMap = {}

            const ruleDefaultField2 = innerRule.defaultField

            if (ruleDefaultField2 !== undefined) {
              Object.keys(value).forEach((key) => {
                fieldRuleMap[key] = ruleDefaultField2
              })
            }

            fieldRuleMap = {
              ...fieldRuleMap,
              ...innerRule.fields,
            }

            const paredFieldsSchema: ValidatorRules = {}

            Object.keys(fieldRuleMap).forEach((fieldEl) => {
              const fieldSchema = fieldRuleMap[fieldEl]
              const fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema]

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
              // @ts-ignore
              paredFieldsSchema[fieldEl] = fieldSchemaList.map(addFullField.bind(undefined, fieldEl))
            })
            const schema = useSchema(paredFieldsSchema)

            schema.messages(options.messages)

            if (innerRule.options) {
              innerRule.options.messages = options.messages!
              innerRule.options.error = options.error!
            }

            schema.validateWithOptions(value, innerRule.options || options, (errs) => {
              const finalErrors = []

              if (validateErrors && validateErrors.length > 0) {
                finalErrors.push(...validateErrors)
              }

              if (errs && errs.length > 0) {
                finalErrors.push(...errs)
              }

              finishOrProcessNextRule(finalErrors.length > 0 ? finalErrors : [])
            })
          }

          innerProcessRule(rulePackage, ruleCb, options)
        },
        (results) => {
          callUserCallback(results, source, callback)
        },
        source,
      )
    }

    return {
      messages,
      register,
      validate,
      validateWithOptions,
    }
  }

  return {
    messages,
    register,
    useSchema,
  }
}
