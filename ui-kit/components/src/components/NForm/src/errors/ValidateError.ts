import type { ValidationError } from 'yup'

export type FieldsValidationError = Record<string, ValidationError[]>

export class FormValidationError extends Error {
  errors: ValidationError[]
  fields: FieldsValidationError

  constructor(errors: ValidationError[], fields: FieldsValidationError) {
    super('FormValidationError')
    this.errors = errors
    this.fields = fields
    this.name = 'FormValidationError'
  }
}
