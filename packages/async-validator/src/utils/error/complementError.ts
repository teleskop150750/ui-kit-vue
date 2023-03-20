import type { InternalRuleItem, Nillable, ValidateError, ValidateValue, ValidateValues } from '../../types'
import { isValidateError } from '../is-type'

export function complementError(rule: InternalRuleItem, source: ValidateValues) {
  return (validateError: ValidateError | (() => string) | string): ValidateError => {
    const fieldValue = getFieldValue(validateError, rule, source)

    if (isValidateError(validateError)) {
      validateError.field ||= rule.fullField
      validateError.fieldValue = fieldValue

      return validateError
    }

    return {
      message: typeof validateError === 'function' ? validateError() : validateError,
      fieldValue,
      field: (validateError as ValidateError).field || rule.fullField,
    }
  }
}

function getFieldValue(
  validateError: ValidateError | (() => string) | string,
  rule: InternalRuleItem,
  source: ValidateValues,
) {
  if (rule.fullFields) {
    return getValue(source, rule.fullFields)
  }

  const key = (validateError as ValidateError).field || rule.fullField

  if (!key) {
    return undefined
  }

  return source[key]
}

function getValue(value: ValidateValues, path: string[]): Nillable<ValidateValue> {
  let v = value

  for (const element of path) {
    if (v === undefined) {
      return v
    }

    v = v[element]
  }

  return v as ValidateValue
}
