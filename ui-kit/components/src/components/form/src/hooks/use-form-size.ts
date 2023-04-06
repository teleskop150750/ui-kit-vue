import type { ComponentSize } from '@nado/ui-kit-constants'
import { useGlobalSize, useProp } from '@nado/ui-kit-hooks'
import type { MaybeRef } from '@nado/ui-kit-utils'
import { computed, inject, ref, unref } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY, FORM_ITEM_INJECTION_KEY } from '../tokens'

export function useFormSize(
  fallback?: MaybeRef<ComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {},
) {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size')
  const globalConfig = ignore.global ? emptyRef : useGlobalSize()
  const form = ignore.form ? { size: undefined } : inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const formItem = ignore.formItem ? { size: undefined } : inject(FORM_ITEM_INJECTION_KEY, undefined)

  return computed(
    (): ComponentSize => size.value || unref(fallback) || formItem?.size || form?.size || globalConfig.value || '',
  )
}
