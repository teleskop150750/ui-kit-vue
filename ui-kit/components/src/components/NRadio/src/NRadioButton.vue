<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'

import { useRadio } from './hooks'
import { radioButtonProps } from './NRadioButton.model'

const props = defineProps(radioButtonProps)

const ns = useNamespace('radio-button')
const { radioRef, size, disabled, modelValue, radioGroup } = useRadio(props)
</script>

<script lang="ts">
export default {
  name: 'NRadioButton',
}
</script>

<template>
  <label :class="[ns.b(), ns.is('active', modelValue === value), ns.is('disabled', disabled), ns.type('size', size)]">
    <input
      ref="radioRef"
      v-model="modelValue"
      :class="ns.e('native')"
      :value="value"
      type="radio"
      :name="name || radioGroup?.name"
      :disabled="disabled"
    />
    <span :class="ns.e('inner')" @keydown.stop>
      <slot>
        {{ value }}
      </slot>
    </span>
  </label>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-radio/n-radio-button/index.css');
</style>
