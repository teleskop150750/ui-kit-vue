<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { computed, useSlots } from 'vue'

import { nCheckboxEmits, nCheckboxProps } from './checkbox.model'
import { useCheckbox } from './composables'

const props = defineProps(nCheckboxProps)

defineEmits(nCheckboxEmits)

const slots = useSlots()

const {
  inputId,
  isLabeledByFormItem,
  isChecked,
  isDisabled,
  isFocused,
  checkboxSize,
  hasOwnLabel,
  model,
  handleChange,
  onClickRoot,
} = useCheckbox(props, slots)

const ns = useNamespace('checkbox')

const compKls = computed(() => [
  ns.b(),
  ns.m(checkboxSize.value),
  ns.is('disabled', isDisabled.value),
  ns.is('bordered', props.border),
  ns.is('checked', isChecked.value),
])

const spanKls = computed(() => [
  ns.e('input'),
  ns.is('disabled', isDisabled.value),
  ns.is('checked', isChecked.value),
  ns.is('indeterminate', props.indeterminate),
  ns.is('focus', isFocused.value),
])
</script>

<script lang="ts">
export default {
  name: 'NCheckbox',
}
</script>

<template>
  <component
    :is="!hasOwnLabel && isLabeledByFormItem ? 'span' : 'label'"
    :class="compKls"
    :aria-controls="indeterminate ? controls : null"
    @click="onClickRoot"
  >
    <span
      :class="spanKls"
      :tabindex="indeterminate ? 0 : undefined"
      :role="indeterminate ? 'checkbox' : undefined"
      :aria-checked="indeterminate ? 'mixed' : undefined"
    >
      <input
        v-if="trueLabel || falseLabel"
        :id="inputId"
        v-model="model"
        :class="ns.e('original')"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :tabindex="tabindex"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <input
        v-else
        :id="inputId"
        v-model="model"
        :class="ns.e('original')"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :tabindex="tabindex"
        :disabled="isDisabled"
        :value="label"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span v-if="hasOwnLabel" :class="ns.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </component>
</template>
