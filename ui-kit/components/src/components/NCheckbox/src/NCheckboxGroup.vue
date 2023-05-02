<script setup lang="ts">
import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { useNamespace } from '@nado/ui-kit-hooks'
import { debugWarn, pick } from '@nado/ui-kit-utils'
import { computed, nextTick, provide, toRefs, watch } from 'vue'

import { useFormItem, useFormItemInputId } from '../../NForm'
import { checkboxGroupEmits, checkboxGroupProps, type CheckboxGroupValueType } from './NCheckboxGroup.model'
import { CHECKBOX_GROUP_INJECTION_KEY } from './tokens'

const props = defineProps(checkboxGroupProps)

const emit = defineEmits(checkboxGroupEmits)

const ns = useNamespace('checkbox')

const { formItem } = useFormItem()
const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
  formItemContext: formItem,
})

async function changeEvent(value: CheckboxGroupValueType) {
  emit(UPDATE_MODEL_EVENT, value)
  await nextTick()
  emit('change', value)
}

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val: CheckboxGroupValueType) {
    changeEvent(val)
  },
})

provide(CHECKBOX_GROUP_INJECTION_KEY, {
  ...pick(toRefs(props), ['size', 'min', 'max', 'disabled', 'validateEvent']),
  modelValue,
  changeEvent,
})

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
  name: 'NCheckboxGroup',
}
</script>

<template>
  <component
    :is="tag"
    :id="groupId"
    :class="ns.b('group')"
    role="group"
    :aria-label="!isLabeledByFormItem ? label || 'checkbox-group' : undefined"
    :aria-labelledby="isLabeledByFormItem ? formItem?.labelId : undefined"
  >
    <slot />
  </component>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-checkbox/n-checkbox-group/index.css');
</style>
