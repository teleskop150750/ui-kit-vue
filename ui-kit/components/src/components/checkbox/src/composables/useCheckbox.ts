import { isArray } from '@nado/ui-kit-utils'
import type { ComponentInternalInstance } from 'vue'

import { useFormItem, useFormItemInputId } from '../../../form'
import type { NCheckboxProps } from '../checkbox.model'
import { useCheckboxDisabled } from './useCheckboxDisabled'
import { useCheckboxEvent } from './useCheckboxEvent'
import { type CheckboxModel, useCheckboxModel } from './useCheckboxModel'
import { useCheckboxStatus } from './useCheckboxStatus'

function setStoreValue(props: NCheckboxProps, { model }: Pick<CheckboxModel, 'model'>) {
  function addToStore() {
    if (isArray(model.value) && !model.value.includes(props.val)) {
      model.value.push(props.val)
    } else {
      model.value = props.trueValue || true
    }
  }
  props.checked && addToStore()
}

export function useCheckbox(props: NCheckboxProps, slots: ComponentInternalInstance['slots']) {
  const { formItem } = useFormItem()
  const { model, isGroup, isLimitExceeded } = useCheckboxModel(props)
  const { isFocused, isChecked, checkboxButtonSize, checkboxSize, hasOwnLabel } = useCheckboxStatus(props, slots, {
    model,
  })
  const { isDisabled } = useCheckboxDisabled({ model, isChecked })
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: formItem,
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup,
  })
  const { handleChange, handleClickRoot } = useCheckboxEvent(props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem,
  })

  setStoreValue(props, { model })

  return {
    inputId,
    isLabeledByFormItem,
    isChecked,
    isDisabled,
    isFocused,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    model,
    handleChange,
    handleClickRoot,
  }
}
