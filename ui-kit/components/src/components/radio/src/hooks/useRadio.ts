import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { computed, inject, ref, type SetupContext } from 'vue'

import { useFormDisabled, useFormSize } from '../../../form'
import type { NRadioEmits, NRadioProps } from '../radio.model'
import { N_RADIO_GROUP_INJECTION_KEY } from '../tokens'

export function useRadio(
  props: { value: NRadioProps['value']; modelValue?: NRadioProps['modelValue'] },
  emit?: SetupContext<NRadioEmits>['emit'],
) {
  const radioRef = ref<HTMLInputElement>()
  const radioGroup = inject(N_RADIO_GROUP_INJECTION_KEY, undefined)
  const isGroup = computed(() => !!radioGroup)
  const modelValue = computed<NRadioProps['modelValue']>({
    get() {
      return isGroup.value ? radioGroup!.modelValue : props.modelValue!
    },
    set(val) {
      if (isGroup.value) {
        radioGroup!.changeEvent(val)
      } else {
        emit && emit(UPDATE_MODEL_EVENT, val)
      }

      radioRef.value!.checked = props.modelValue === props.value
    },
  })

  const size = useFormSize(computed(() => radioGroup?.size))
  const disabled = useFormDisabled(computed(() => radioGroup?.disabled))
  const tabIndex = computed(() => (disabled.value || (isGroup.value && modelValue.value !== props.value) ? -1 : 0))

  return {
    radioRef,
    isGroup,
    radioGroup,
    size,
    disabled,
    tabIndex,
    modelValue,
  }
}
