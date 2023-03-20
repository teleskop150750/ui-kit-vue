import type { ValidateError } from '../../types'

export function isValidateError(obj: ValidateError | string | (() => string)): obj is ValidateError {
  return !!(obj && (obj as ValidateError).message !== undefined)
}
