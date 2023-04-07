<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { useId, useNamespace } from '@nado/ui-kit-hooks'
import { debugWarn } from '@nado/ui-kit-utils'
import { computed, nextTick, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'

import { useFormItem, useFormItemInputId } from '../../form'
import { nRadioGroupEmits, type RadioGroupProps, radioGroupProps } from './radio-group.model'
import { N_RADIO_GROUP_INJECTION_KEY } from './tokens'

const props = defineProps(radioGroupProps)

const emit = defineEmits(nRadioGroupEmits)

const ns = useNamespace('radio')
const radioId = useId()
const radioGroupRef = ref<HTMLDivElement>()
const { formItem } = useFormItem()
const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
  formItemContext: formItem,
})

function changeEvent(value: RadioGroupProps['modelValue']) {
  emit(UPDATE_MODEL_EVENT, value)
  nextTick(() => emit('change', value))
}

onMounted(() => {
  const radios = radioGroupRef.value!.querySelectorAll<HTMLInputElement>('[type=radio]')
  const firstLabel = radios[0]

  if (![...radios].some((radio) => radio.checked) && firstLabel) {
    firstLabel.tabIndex = 0
  }
})

const name = computed(() => props.name || radioId.value)

provide(
  N_RADIO_GROUP_INJECTION_KEY,
  reactive({
    ...toRefs(props),
    changeEvent,
    name,
  }),
)

watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItem?.validate('change').catch((error) => debugWarn(error))
    }
  },
)
</script>

<script lang="ts">
export default {
  name: 'NRadioGroup',
}
</script>

<template>
  <div
    :id="groupId"
    ref="radioGroupRef"
    :class="ns.b('group')"
    role="radiogroup"
    :aria-label="!isLabeledByFormItem ? label || 'radio-group' : undefined"
    :aria-labelledby="isLabeledByFormItem ? formItem!.labelId : undefined"
  >
    <slot />
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-radio/n-radio-group/index.css');
</style>
