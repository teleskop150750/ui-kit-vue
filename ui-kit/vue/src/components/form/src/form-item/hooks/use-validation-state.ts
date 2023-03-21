import { ref } from 'vue'

import type { NFormItemValidateState } from '../form-item.model'

export function useValidationState() {
  const validateState = ref<NFormItemValidateState>('')

  function setValidationState(state: NFormItemValidateState) {
    validateState.value = state
  }

  return { setValidationState, validateState }
}
