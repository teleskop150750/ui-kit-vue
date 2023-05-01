<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { computed, useSlots } from 'vue'

import { useCheckbox } from './composables'
import { checkboxEmits, checkboxProps } from './NCheckbox.model'

const props = defineProps(checkboxProps)

defineEmits(checkboxEmits)

const slots = useSlots()

const { isFocused, isChecked, isDisabled, checkboxButtonSize, model, handleChange } = useCheckbox(props, slots)
const ns = useNamespace('checkbox-button')

const labelClasses = computed(() => [
  ns.b(),
  ns.m(checkboxButtonSize.value),
  ns.is('disabled', isDisabled.value),
  ns.is('checked', isChecked.value),
  ns.is('focus', isFocused.value),
])
</script>

<script lang="ts">
export default {
  name: 'NCheckboxButton',
}
</script>

<template>
  <label :class="labelClasses">
    <input
      v-if="trueValue || falseValue"
      v-model="model"
      :class="ns.e('native')"
      type="checkbox"
      :name="name"
      :tabindex="tabindex"
      :disabled="isDisabled"
      :true-value="trueValue"
      :false-value="falseValue"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <input
      v-else
      v-model="model"
      :class="ns.e('native')"
      type="checkbox"
      :name="name"
      :tabindex="tabindex"
      :disabled="isDisabled"
      :value="val"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <span v-if="$slots.default || val" :class="ns.e('inner')">
      <slot>{{ val }}</slot>
    </span>
  </label>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-checkbox/n-checkbox-button/index.css');
</style>
