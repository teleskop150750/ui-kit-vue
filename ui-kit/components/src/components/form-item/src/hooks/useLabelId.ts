import { useId } from '@nado/ui-kit-hooks'
import type { Nillable } from '@nado/ui-kit-utils'
import { computed, type ComputedRef, inject, type Ref, ref, useSlots } from 'vue'

import { FORM_CONTEXT_INJECTION_KEY, type NFormItemContext } from '../../../form/src/tokens'
import type { NFormItemProps } from '../form-item.model'

interface Return {
  hasLabel: ComputedRef<boolean>
  currentLabel: ComputedRef<string>
  labelFor: ComputedRef<Nillable<string>>
  labelId: string
  inputIds: Ref<string[]>

  addInputId: NFormItemContext['addInputId']
  removeInputId: NFormItemContext['removeInputId']
}

export function useLabelId(props: NFormItemProps): Return {
  const formContext = inject(FORM_CONTEXT_INJECTION_KEY, undefined)
  const slots = useSlots()
  const labelId = useId().value

  const inputIds = ref<string[]>([])
  const hasLabel = computed<boolean>(() => !!(props.label || slots.label))

  const labelFor = computed<string | undefined>(() =>
    props.for || inputIds.value.length === 1 ? inputIds.value[0] : undefined,
  )

  function addInputId(id: string) {
    if (!inputIds.value.includes(id)) {
      inputIds.value.push(id)
    }
  }

  function removeInputId(id: string) {
    inputIds.value = inputIds.value.filter((listId) => listId !== id)
  }

  const currentLabel = computed(() => `${props.label || ''}${formContext?.labelSuffix || ''}`)

  return {
    hasLabel,
    currentLabel,
    labelFor,
    labelId,
    inputIds,
    addInputId,
    removeInputId,
  }
}
