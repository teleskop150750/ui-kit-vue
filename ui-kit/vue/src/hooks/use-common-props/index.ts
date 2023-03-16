import { type ComponentSize, componentSizes } from '@ui/constants'
import { FORM_CONTEXT_INJECTION_KEY, FORM_ITEM_INJECTION_KEY } from '@ui/tokens'
import { buildProp } from '@ui/utils'
import type { MaybeRef } from '@vueuse/core'
import { computed, inject, ref, unref } from 'vue'

import { useGlobalConfig } from '../use-global-config'
import { useProp } from '../use-prop'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const)

export const useSize = (
  fallback?: MaybeRef<ComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {},
) => {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size')
  const globalConfig = ignore.global ? emptyRef : useGlobalConfig('size')
  const form = ignore.form ? { size: undefined } : inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const formItem = ignore.formItem ? { size: undefined } : inject(FORM_ITEM_INJECTION_KEY, undefined)

  return computed(
    (): ComponentSize => size.value || unref(fallback) || formItem?.size || form?.size || globalConfig.value || '',
  )
}

export const useDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(FORM_CONTEXT_INJECTION_KEY, undefined)

  return computed(() => disabled.value || unref(fallback) || form?.disabled || false)
}
