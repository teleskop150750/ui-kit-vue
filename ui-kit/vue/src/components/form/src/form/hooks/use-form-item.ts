import { inject } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY, FORM_ITEM_INJECTION_KEY } from '../../tokens'

export function useFormItem() {
  const form = inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const formItem = inject(FORM_ITEM_INJECTION_KEY, undefined)

  return {
    form,
    formItem,
  }
}
