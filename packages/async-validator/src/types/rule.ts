import type { Arrayable, Awaitable, Nillable } from './typescript'
import type { ExecuteValidator, SyncErrorType, SyncValidateResult, ValidateOption } from './validate'
import type { ValidateValue, ValidateValues } from './values'

export type RuleType =
  | 'boolean'
  | 'string'
  | 'pattern'
  | 'regexp'
  | 'email'
  | 'url'
  | 'hex'
  | 'number'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'method'
  | 'enum'
  | 'date'
  | 'any'

export type RuleCallback = (error?: Arrayable<SyncErrorType>) => void

export interface RuleItem {
  type?: RuleType // default type is 'string'
  required?: boolean
  pattern?: RegExp | string
  min?: number // Range of type 'string' and 'array'
  max?: number // Range of type 'string' and 'array'
  len?: number // Length of type 'string' and 'array'
  enum?: Array<Nillable<string | number | boolean>> // possible values of type 'enum'
  whitespace?: boolean
  fields?: Record<string, Rule> | undefined // ignore when without required
  options?: ValidateOption | undefined
  defaultField?: Rule // 'object' or 'array' containing validation rules
  transform?: (value: ValidateValue) => ValidateValue
  message?: string | ((a?: string) => string)
  asyncValidator?: (
    rule: InternalRuleItem,
    value: ValidateValue,
    callback: RuleCallback,
    source: ValidateValues,
    options: ValidateOption,
  ) => Awaitable<void>
  validator?: (
    rule: InternalRuleItem,
    value: ValidateValue,
    callback: RuleCallback,
    source: ValidateValues,
    options: ValidateOption,
  ) => SyncValidateResult | void
}

export interface InternalRuleItem extends Omit<RuleItem, 'validator'> {
  field?: string
  fullField?: string
  fullFields?: string[]
  validator?: RuleItem['validator'] | ExecuteValidator
}

export interface RuleValuePackage {
  rule: InternalRuleItem
  value: ValidateValue
  source: ValidateValues
  field: string
}

export type Rule = Arrayable<RuleItem>

export type RulesMap = Record<string, Rule>
export type Rules = RulesMap
export type RuleValuePackageMap = Record<string, RuleValuePackage[]>

export interface CallbackRule extends RuleItem {
  fullField: string
  fullFields: string[]
}

/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 *  @param type Rule type
 */
export type ExecuteRule = (
  rule: InternalRuleItem,
  value: ValidateValue,
  source: ValidateValues,
  errors: string[],
  options: ValidateOption,
  type?: string,
) => void
