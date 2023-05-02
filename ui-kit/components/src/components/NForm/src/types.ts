import type { Arrayable } from '@nado/ui-kit-utils'
import type { ValidationError } from 'yup'

import type { FieldsValidationError } from './errors'
import type { FormItemRule } from './NFormItem/types'

export type NFormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type NFormValidationResult = Promise<boolean>
export type NFormValidateCallback = (isValid: boolean, invalidFields?: FieldsValidationError) => void
export interface NFormValidateFailure {
  errors: ValidationError[] | null
}
