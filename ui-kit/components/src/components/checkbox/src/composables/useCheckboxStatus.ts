import { isArray, isBoolean, isEqual, isObject } from '@nado/ui-kit-utils'
import { type ComponentInternalInstance, computed, inject, ref, toRaw } from 'vue'

import { useFormSize } from '../../../form'
import type { NCheckboxProps } from '../checkbox.model'
import { CHECKBOX_GROUP_INJECTION_KEY } from '../tokens'
import type { CheckboxModel } from '.'

export function useCheckboxStatus(
  props: NCheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Pick<CheckboxModel, 'model'>,
) {
  const checkboxGroup = inject(CHECKBOX_GROUP_INJECTION_KEY, undefined)
  const isFocused = ref(false)
  const isChecked = computed<boolean>(() => {
    const { value } = model

    if (isBoolean(value)) {
      return value
    }

    if (isArray(value)) {
      if (isObject(props.val)) {
        return value.map(toRaw).some((o) => isEqual(o, props.val))
      }

      return value.map(toRaw).includes(props.val)
    }

    if (value !== null && value !== undefined) {
      return value === props.trueValue
    }

    return !!value
  })

  const checkboxButtonSize = useFormSize(
    computed(() => checkboxGroup?.size?.value),
    {
      prop: true,
    },
  )
  const checkboxSize = useFormSize(computed(() => checkboxGroup?.size?.value))

  const hasOwnLabel = computed<boolean>(() => !!slots.default)

  return {
    checkboxButtonSize,
    isChecked,
    isFocused,
    checkboxSize,
    hasOwnLabel,
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
