/* eslint no-console:0 */

import type { SyncErrorType } from '../../types'

declare let ASYNC_VALIDATOR_NO_WARNING: boolean | undefined

export const warning: { value: (type: string, errors: SyncErrorType[]) => void } = { value: () => {} }

// don't print warning message when in production env or node runtime
if (
  typeof process !== 'undefined' &&
  process.env &&
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  typeof document !== 'undefined'
) {
  warning.value = (type, errors) => {
    if (
      typeof console !== 'undefined' &&
      console.warn &&
      ASYNC_VALIDATOR_NO_WARNING === undefined &&
      errors.every((e) => typeof e === 'string')
    ) {
      console.warn(type, errors)
    }
  }
}
