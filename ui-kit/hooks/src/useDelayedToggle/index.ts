import { buildProps, isNumber } from '@nado/ui-kit-utils'
import { type ExtractPropTypes, type ToRefs, unref } from 'vue'

import { useTimeout } from '../useTimeout'

export const useDelayedToggleProps = buildProps({
  /**
   * @description delay of appearance, in millisecond
   */
  showAfter: {
    type: Number,
    default: 0,
  },
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * @description disappear automatically, in millisecond
   */
  autoClose: {
    type: Number,
    default: 0,
  },
} as const)

export type UseDelayedToggleProps = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<ExtractPropTypes<typeof useDelayedToggleProps>>

export function useDelayedToggle({ showAfter, hideAfter, autoClose, open, close }: UseDelayedToggleProps) {
  const { registerTimeout } = useTimeout()
  const { registerTimeout: registerTimeoutForAutoClose, cancelTimeout: cancelTimeoutForAutoClose } = useTimeout()

  function delayOpen(event?: Event) {
    registerTimeout(() => {
      open(event)

      const _autoClose = unref(autoClose)

      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event)
        }, _autoClose)
      }
    }, unref(showAfter))
  }

  function delayClose(event?: Event) {
    cancelTimeoutForAutoClose()

    registerTimeout(() => {
      close(event)
    }, unref(hideAfter))
  }

  return {
    delayOpen,
    delayClose,
  }
}
