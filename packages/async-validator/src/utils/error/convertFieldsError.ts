import type { ValidateError, ValidateFieldsError } from '../../types'

export function fieldsErrorListToMap(errors: ValidateError[]): ValidateFieldsError {
  const fields: ValidateFieldsError = {}

  errors.forEach((error) => {
    const { field } = error

    if (field !== undefined) {
      fields[field] ||= []
      fields[field].push(error)
    }
  })

  return fields
}
