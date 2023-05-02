// import type { ValidateError, ValidateFieldsError } from '@nado/async-validator'
import type { Arrayable } from '@nado/ui-kit-utils'
import type { ValidationError } from 'yup'

import type { FormItemRule } from '../../NFormItem'

export type NFormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type NFormValidationResult = Promise<boolean>
export type NFormValidateCallback = (isValid: boolean, invalidFields?: ValidationError) => void
export interface NFormValidateFailure {
  errors: ValidationError[] | null
}
