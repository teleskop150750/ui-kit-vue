<script setup lang="ts">
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
  handleClickRoot,
} = useCheckbox(props, slots)

const ns = useNamespace('checkbox')

const rootClasses = computed(() => [
  ns.b(),
  ns.type('size', checkboxSize.value),
  ns.is('disabled', isDisabled.value),
  ns.is('bordered', props.border),
  ns.is('checked', isChecked.value),
])

const inputClasses = computed(() => [
  ns.e('input'),
  ns.eIs('input', 'disabled', isDisabled.value),
  ns.eIs('input', 'checked', isChecked.value),
  ns.eIs('input', 'indeterminate', props.indeterminate),
  ns.eIs('input', 'focus', isFocused.value),
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
    :class="rootClasses"
    :aria-controls="indeterminate ? controls : null"
    @click="handleClickRoot"
  >
    <span
      :class="inputClasses"
      :tabindex="indeterminate ? 0 : undefined"
      :role="indeterminate ? 'checkbox' : undefined"
      :aria-checked="indeterminate ? 'mixed' : undefined"
    >
      <input
        v-if="trueValue || falseValue"
        :id="inputId"
        v-model="model"
        :class="ns.e('native')"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :tabindex="tabindex"
        :disabled="isDisabled"
        :true-value="trueValue"
        :false-value="falseValue"
        @change.prevent="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <input
        v-else
        :id="inputId"
        v-model="model"
        :class="ns.e('native')"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :tabindex="tabindex"
        :disabled="isDisabled"
        :value="val"
        @change.prevent="handleChange"
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

<style>
@import url('@nado/ui-kit-theme/src/components/n-checkbox/n-checkbox/index.css');
</style>
