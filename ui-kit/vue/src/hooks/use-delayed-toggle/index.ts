import { buildProps } from '@ui/utils'
import { type ExtractPropTypes, type ToRefs, unref } from 'vue'

import { useTimeout } from '../use-timeout'

export const useDelayedToggleProps = buildProps({
  showAfter: {
    type: Number,
    default: 0,
  },
  hideAfter: {
    type: Number,
    default: 200,
  },
} as const)

export type UseDelayedToggleProps = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<ExtractPropTypes<typeof useDelayedToggleProps>>

export function useDelayedToggle({ showAfter, hideAfter, open, close }: UseDelayedToggleProps) {
  const { registerTimeout } = useTimeout()

  const delayOpen = (event?: Event) => {
    registerTimeout(() => {
      open(event)
    }, unref(showAfter))
  }

  const delayClose = (event?: Event) => {
    registerTimeout(() => {
      close(event)
    }, unref(hideAfter))
  }

  return {
    delayOpen,
    delayClose,
  }
}
