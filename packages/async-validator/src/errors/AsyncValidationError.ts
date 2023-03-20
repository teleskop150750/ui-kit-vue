import type { ValidateError, ValidateFieldsError } from '../types'

export class AsyncValidationError extends Error {
  errors: ValidateError[]
  fields: ValidateFieldsError

  constructor(errors: ValidateError[], fields: ValidateFieldsError) {
    super('Async Validation Error')
    this.errors = errors
    this.fields = fields
    this.name = 'AsyncValidationError'
  }
}
