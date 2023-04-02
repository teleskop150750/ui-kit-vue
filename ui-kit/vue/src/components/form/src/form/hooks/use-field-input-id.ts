import { useId } from '@ui/hooks'
import type { Nillable } from '@ui/utils'
import {
  computed,
  type ComputedRef,
  onMounted,
  onUnmounted,
  type Ref,
  ref,
  toRef,
  watch,
  type WatchStopHandle,
} from 'vue'

import type { NFormItemContext } from '../../tokens'

export interface IUseFormItemInputCommonProps {
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label?: string | number | boolean | Record<string, any>
}

export function useFormItemInputId(
  props: Partial<IUseFormItemInputCommonProps>,
  {
    formItemContext,
    disableIdGeneration,
    disableIdManagement,
  }: {
    formItemContext?: NFormItemContext
    disableIdGeneration?: ComputedRef<boolean> | Ref<boolean>
    disableIdManagement?: ComputedRef<boolean> | Ref<boolean>
  },
) {
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
      // TODO: remove any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
