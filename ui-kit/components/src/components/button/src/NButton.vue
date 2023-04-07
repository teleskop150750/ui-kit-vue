<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { computed, useSlots } from 'vue'

import { NSpinner } from '../../spinner'
import { nButtonEmits, nButtonProps } from './button.model'
import { useButton } from './hooks'

const props = defineProps(nButtonProps)
const emit = defineEmits(nButtonEmits)

const ns = useNamespace('button')
const nsGroup = useNamespace('button-group')
const {
  _ref,
  _size,
  _appearance,
  _disabled,
  actionable,
  handleClick,
  isButtonGroup,
  tagComputed,
  buttonLinkAttributesComputed,
} = useButton(props, emit)

const slots = useSlots()
const hasLabel = computed(() => props.label !== undefined && props.label !== null && props.label !== '')
const hasLabelSlot = computed(() => Boolean(slots.default))
const hasLabelContent = computed(() => hasLabel.value || hasLabelSlot.value)

defineExpose({
  ref: _ref,
  size: _size,
  _appearance,
  disabled: _disabled,
})
</script>

<script lang="ts">
export default {
  name: 'NButton',
}
</script>

<template>
  <component
    :is="tagComputed"
    ref="_ref"
    :class="[
      nsGroup.e('item', isButtonGroup),
      ns.b(),
      ns.type('appearance', _appearance || 'primary'),
      ns.type('mode', mode),
      ns.type('size', _size),
      ns.type('align', align),
      ns.is('round', round),
      ns.is('disabled', _disabled),
      ns.is('loading', props.loading),
      ns.is('hoverable', actionable),
    ]"
    :disabled="!actionable"
    v-bind="buttonLinkAttributesComputed"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <span :class="ns.e('content')">
      <component
        :is="icon"
        v-if="icon"
        class="n-icon"
        :class="[ns.e('icon'), hasLabelContent && ns.em('icon', 'left')]"
        role="img"
        aria-hidden="true"
      />
      <slot name="icon" :has-label="hasLabelContent" />
      <span v-if="hasLabel" :class="ns.e('label')">{{ label }}</span>
      <slot />
      <component
        :is="iconRight"
        v-if="iconRight"
        class="n-icon"
        :class="[ns.e('icon'), hasLabelContent && ns.em('icon', 'right')]"
        role="img"
        aria-hidden="true"
      />
      <slot name="icon-right" :has-label="hasLabelContent" />
    </span>
    <span v-if="loading" :class="ns.e('loading')">
      <NSpinner :class="ns.e('loading-icon')" />
    </span>
  </component>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-button/n-button/index.css');
</style>
