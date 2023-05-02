import { inject } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY } from '../NForm/tokens'
import { FORM_ITEM_INJECTION_KEY } from '../NFormItem/tokens'

export function useFormItem() {
  const form = inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const formItem = inject(FORM_ITEM_INJECTION_KEY, undefined)

  return {
    form,
    formItem,
  }
}
