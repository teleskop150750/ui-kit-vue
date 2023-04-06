import type { ValidateError, ValidateFieldsError } from '@nado/async-validator'
import type { Arrayable } from '@nado/ui-kit-utils'

import type { FormItemRule } from '../form-item/types'

export type NFormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type NFormValidationResult = Promise<boolean>
export type NFormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void
export interface NFormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}
