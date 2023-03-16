import { FORM_CONTEXT_INJECTION_KEY, FORM_ITEM_INJECTION_KEY, type FormItemContext } from '@ui/tokens'
import type { Nillable } from '@ui/utils'
import {
  computed,
  type ComputedRef,
  inject,
  onMounted,
  onUnmounted,
  type Ref,
  ref,
  toRef,
  watch,
  type WatchStopHandle,
} from 'vue'

import { useId } from '../use-id'

export function useFormItem() {
  const form = inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const formItem = inject(FORM_ITEM_INJECTION_KEY, undefined)

  return {
    form,
    formItem,
  }
}

export interface IUseFormItemInputCommonProps {
  id?: string
  label?: string | number | boolean | Record<string, any>
}

export const useFormItemInputId = (
  props: Partial<IUseFormItemInputCommonProps>,
  {
    formItemContext,
    disableIdGeneration,
    disableIdManagement,
  }: {
    formItemContext?: FormItemContext
    disableIdGeneration?: ComputedRef<boolean> | Ref<boolean>
    disableIdManagement?: ComputedRef<boolean> | Ref<boolean>
  },
) => {
  if (!disableIdGeneration) {
    disableIdGeneration = ref<boolean>(false)
  }

  if (!disableIdManagement) {
    disableIdManagement = ref<boolean>(false)
  }

  const inputId = ref<string>()
  let idUnwatch: Nillable<WatchStopHandle> = undefined

  const isLabeledByFormItem = computed<boolean>(
    () => !!(!props.label && formItemContext && formItemContext.inputIds && formItemContext.inputIds?.length <= 1),
  )

  // Сгенерировать id для NFormItem label если он не указан в качестве prop
  onMounted(() => {
    idUnwatch = watch(
      [toRef(props, 'id'), disableIdGeneration] as any,
      ([id, _disableIdGeneration]: [string, boolean]) => {
        const newId = id ?? (!_disableIdGeneration ? useId().value : undefined)

        if (newId === inputId.value) {
          return
        }

        if (formItemContext?.removeInputId) {
          inputId.value && formItemContext.removeInputId(inputId.value)

          if (!disableIdManagement?.value && !_disableIdGeneration && newId) {
            formItemContext.addInputId(newId)
          }
        }

        inputId.value = newId
      },
      { immediate: true },
    )
  })

  onUnmounted(() => {
    idUnwatch && idUnwatch()

    if (formItemContext?.removeInputId) {
      inputId.value && formItemContext.removeInputId(inputId.value)
    }
  })

  return {
    isLabeledByFormItem,
    inputId,
  }
}
