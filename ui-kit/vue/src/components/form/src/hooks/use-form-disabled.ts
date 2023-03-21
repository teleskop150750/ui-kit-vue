import { useProp } from '@ui/hooks'
import type { MaybeRef } from '@vueuse/core'
import { computed, inject, unref } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY } from '../tokens'

export function useFormDisabled(fallback?: MaybeRef<boolean | undefined>) {
  const disabled = useProp<boolean>('disabled')
  const form = inject(FORM_CONTEXT_INJECTION_KEY, undefined)

  return computed(() => disabled.value || unref(fallback) || form?.disabled || false)
}
