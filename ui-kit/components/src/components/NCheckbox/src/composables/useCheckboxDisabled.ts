import { isUndefined } from '@nado/ui-kit-utils'
import { computed, inject } from 'vue'

import { useFormDisabled } from '../../../NForm'
import { CHECKBOX_GROUP_INJECTION_KEY } from '../tokens'
import type { CheckboxModel, CheckboxStatus } from '.'

export function useCheckboxDisabled({
  model,
  isChecked,
}: Pick<CheckboxModel, 'model'> & Pick<CheckboxStatus, 'isChecked'>) {
  const checkboxGroup = inject(CHECKBOX_GROUP_INJECTION_KEY, undefined)

  const isLimitDisabled = computed(() => {
    const max = checkboxGroup?.max?.value
    const min = checkboxGroup?.min?.value

    return (
      (!isUndefined(max) && model.value.length >= max && !isChecked.value) ||
      (!isUndefined(min) && model.value.length <= min && isChecked.value)
    )
  })

  const isDisabled = useFormDisabled(computed(() => checkboxGroup?.disabled.value || isLimitDisabled.value))

  return {
    isDisabled,
    isLimitDisabled,
  }
}

export type CheckboxDisabled = ReturnType<typeof useCheckboxDisabled>
