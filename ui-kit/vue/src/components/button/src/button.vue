<script setup lang="ts">
import { NSpinner } from '@ui/components/spinner'
import { useNamespace } from '@ui/hooks'
import { computed, useSlots } from 'vue'

import { nButtonEmits, nButtonProps } from './button.model'
import { useButton } from './useButton'

const props = defineProps(nButtonProps)
const emit = defineEmits(nButtonEmits)

const ns = useNamespace('button')
const nsGroup = useNamespace('button-group')
const { _ref, _size, _type, _disabled, handleClick, isButtonGroup } = useButton(props, emit)

const slots = useSlots()
const hasLabel = computed(() => props.label !== undefined && props.label !== null && props.label !== '')
const hasLabelSlot = computed(() => Boolean(slots.default))
const hasLabelContent = computed(() => hasLabel.value || hasLabelSlot.value)

const actionable = computed(() => _disabled.value !== true && props.loading !== true)

defineExpose({
  ref: _ref,
  size: _size,
  type: _type,
  disabled: _disabled,
})
</script>

<script lang="ts">
export default {
  name: 'NButton',
}
</script>

<template>
  <button
    ref="rootRef"
    :class="[
      nsGroup.e('item', isButtonGroup),
      ns.b(),
      ns.type('appearance', appearance),
      ns.type('mode', mode),
      ns.type('size', size),
      ns.type('align', align),
      ns.is('round', round),
      ns.is('disabled', disabled),
      ns.is('loading', props.loading),
      ns.is('hoverable', actionable),
    ]"
    :aria-disabled="_disabled || loading"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    :type="type"
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
  </button>
</template>
