import { ref } from 'vue'

import type { NFormItemValidateState } from '../NFormItem.model'

export function useValidationState() {
  const validateState = ref<NFormItemValidateState>('')

  function setValidationState(state: NFormItemValidateState) {
    validateState.value = state
  }

  return { setValidationState, validateState }
}
