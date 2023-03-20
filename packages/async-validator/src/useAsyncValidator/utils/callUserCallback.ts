import type { Arrayable, ValidateCallback, ValidateError, ValidateFieldsError, ValidateValues } from '../../types'
import { fieldsErrorListToMap } from '../../utils'

export function callUserCallback(
  validateErrors: Arrayable<ValidateError>[],
  source: ValidateValues,
  callback: ValidateCallback,
) {
  const errors: ValidateError[] = flattenErrors(validateErrors)

  if (errors.length === 0) {
    return callback(undefined, source)
  }

  const fields: ValidateFieldsError = fieldsErrorListToMap(errors)

  callback(errors, fields)
}

function flattenErrors(validateErrors: Arrayable<ValidateError>[]): ValidateError[] {
  const result: ValidateError[] = []

  for (const validateError of validateErrors) {
    if (Array.isArray(validateError)) {
      result.push(...validateError)
    } else {
      result.push(validateError)
    }
  }

  return result
}
