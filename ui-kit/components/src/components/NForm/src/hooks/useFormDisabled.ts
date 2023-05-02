import { useProp } from '@nado/ui-kit-hooks'
import type { MaybeRef } from '@nado/ui-kit-utils'
import { computed, inject, unref } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY } from '../NForm/tokens'

export function useFormDisabled(fallback?: MaybeRef<boolean | undefined>) {
  const disabled = useProp<boolean>('disabled')
  const form = inject(FORM_CONTEXT_INJECTION_KEY, undefined)

  return computed(() => disabled.value || unref(fallback) || form?.disabled || false)
}
