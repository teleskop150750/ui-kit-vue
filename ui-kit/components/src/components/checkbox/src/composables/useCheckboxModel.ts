import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { isArray, isUndefined } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance, inject, ref } from 'vue'

import type { NCheckboxProps } from '../checkbox.model'
import { CHECKBOX_GROUP_INJECTION_KEY } from '../tokens'

export function useCheckboxModel(props: NCheckboxProps) {
  const selfModel = ref<unknown>(false)
  const { emit } = getCurrentInstance()!
  const checkboxGroup = inject(CHECKBOX_GROUP_INJECTION_KEY, undefined)
  const isGroup = computed(() => isUndefined(checkboxGroup) === false)
  const isLimitExceeded = ref(false)
  const model = computed({
    get() {
      return isGroup.value ? checkboxGroup?.modelValue?.value : props.modelValue ?? selfModel.value
    },

    set(val: unknown) {
      if (isGroup.value && isArray(val)) {
        isLimitExceeded.value = checkboxGroup?.max?.value !== undefined && val.length > checkboxGroup?.max.value
        isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
        selfModel.value = val
      }
    },
  })

  return {
    model,
    isGroup,
    isLimitExceeded,
  }
}

export type CheckboxModel = ReturnType<typeof useCheckboxModel>
