import { refDebounced } from '@vueuse/core'
import { computed, inject, type Ref } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY } from '../../../form/src/tokens'
import type { NFormItemProps, NFormItemValidateState } from '../form-item.model'

export function useShouldShowError(props: NFormItemProps, validateState: Ref<NFormItemValidateState>) {
  const formContext = inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const validateStateDebounced = refDebounced(validateState, 100)

  const shouldShowError = computed(
    () => validateStateDebounced.value === 'danger' && props.showMessage && (formContext?.showMessage ?? true),
  )

  return {
    shouldShowError,
  }
}
