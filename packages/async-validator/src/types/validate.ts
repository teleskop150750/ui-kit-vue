import type { ValidateMessages } from './message'
import type { InternalRuleItem, RuleItem, RuleValuePackage } from './rule'
import type { Arrayable, Awaitable, Nillable } from './typescript'
import type { ValidateValue, ValidateValues } from './values'

export type ValidatorRules = Record<string, RuleItem[]>

export interface ValidateOption {
  // whether to suppress internal warning
  suppressWarning?: boolean

  // whether to suppress validator error
  suppressValidatorError?: boolean

  // when the first validation rule generates an error stop processed
  first?: boolean

  // when the first validation rule of the specified field generates an error stop the field processed, 'true' means all fields.
  firstFields?: boolean | string[]

  messages?: Partial<ValidateMessages>

  /** The name of rules need to be trigger. Will validate all rules if leave empty */
  keys?: string[]

  error?: (rule: InternalRuleItem, message: string) => ValidateError
}

export interface ValidateError {
  message?: string
  fieldValue?: ValidateValue
  field?: string
}

export type ValidateFieldsError = Record<string, ValidateError[]>

export type ValidateCallback = (errors: Nillable<ValidateError[]>, fields: ValidateFieldsError | ValidateValues) => void

/**
 *  Performs validation for any type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
export type ExecuteValidator = (
  rule: InternalRuleItem,
  value: ValidateValue,
  callback: (error?: string[]) => void,
  source: ValidateValues,
  options: ValidateOption,
) => void

export type ProcessRule = (data: RuleValuePackage, validateNextRule: (errors: ValidateError[]) => void) => void

export type SyncErrorType = Error | string
export type SyncValidateResult = boolean | Arrayable<SyncErrorType>
export type ValidateResult = Awaitable<void> | SyncValidateResult

export interface ValidateParams {
  source: ValidateValues
  options?: ValidateOption
  callback?: ValidateCallback
}
