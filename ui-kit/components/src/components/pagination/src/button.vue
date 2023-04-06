<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { computed, useSlots } from 'vue'

import { nPaginationNavButtonProps } from './button.model'
import { useButton } from './hooks/use-button'

const props = defineProps(nPaginationNavButtonProps)

const ns = useNamespace('pagination-nav-button')
const { _disabled, tagComputed, buttonLinkAttributesComputed } = useButton(props)

const slots = useSlots()
const hasLabel = computed(() => props.label !== undefined && props.label !== null && props.label !== '')
const hasLabelSlot = computed(() => Boolean(slots.default))
const hasLabelContent = computed(() => hasLabel.value || hasLabelSlot.value)

const actionable = computed(() => _disabled.value !== true)
</script>

<script lang="ts">
export default {
  name: 'NPaginationNavButton',
}
</script>

<template>
  <component
    :is="tagComputed"
    :class="[ns.b(), ns.m('active', active), ns.is('disabled', _disabled), ns.is('hoverable', actionable)]"
    :disabled="_disabled"
    v-bind="buttonLinkAttributesComputed"
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
    </span>
  </component>
</template>
