import { getProp } from '@nado/ui-kit-utils'
import { computed, inject } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY } from '../../../form/src/tokens'
import type { NFormItemProps } from '../form-item.model'

export function useFieldValue(props: NFormItemProps) {
  const formContext = inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const fieldValue = computed(() => {
    const model = formContext?.model

    if (!model || !props.prop) {
      return
    }

    return getProp(model, props.prop).value
  })

  return {
    fieldValue,
  }
}
