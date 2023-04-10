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
    if (isArray(model.value) && !model.value.includes(props.label)) {
      model.value.push(props.label)
    } else {
      model.value = props.trueLabel || true
    }
  }
  props.checked && addToStore()
}

export function useCheckbox(props: NCheckboxProps, slots: ComponentInternalInstance['slots']) {
  const { formItem: elFormItem } = useFormItem()
  const { model, isGroup, isLimitExceeded } = useCheckboxModel(props)
  const { isFocused, isChecked, checkboxButtonSize, checkboxSize, hasOwnLabel } = useCheckboxStatus(props, slots, {
    model,
  })
  const { isDisabled } = useCheckboxDisabled({ model, isChecked })
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: elFormItem,
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup,
  })
  const { handleChange, onClickRoot } = useCheckboxEvent(props, {
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
    onClickRoot,
  }
}
