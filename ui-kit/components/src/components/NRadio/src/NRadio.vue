<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { nextTick } from 'vue'

import { useRadio } from './hooks'
import { radioEmits, radioProps } from './NRadio.model'

const props = defineProps(radioProps)

const emit = defineEmits(radioEmits)

const ns = useNamespace('radio')
const { radioRef, radioGroup, size, disabled, modelValue } = useRadio(props, emit)

function handleChange() {
  nextTick(() => emit('change', modelValue.value))
}
</script>

<script lang="ts">
export default {
  name: 'NRadio',
}
</script>

<template>
  <label
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('bordered', border),
      ns.is('checked', modelValue === value),
      ns.type('size', size),
    ]"
  >
    <span
      :class="[
        ns.e('input-wrapper'),
        ns.eIs('input-wrapper', 'disabled', disabled),
        ns.eIs('input-wrapper', 'checked', modelValue === value),
      ]"
    >
      <input
        ref="radioRef"
        v-model="modelValue"
        :class="ns.e('native')"
        :value="value"
        :name="name || radioGroup?.name"
        :disabled="disabled"
        type="radio"
        @change="handleChange"
      />
      <span :class="ns.e('input')" />
    </span>
    <span v-if="$slots.default" :class="ns.e('label')" @keydown.stop>
      <slot>
        {{ value }}
      </slot>
    </span>
  </label>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-radio/n-radio/index.css');
</style>
