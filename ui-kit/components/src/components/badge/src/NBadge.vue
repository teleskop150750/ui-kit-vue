<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { NIconClose } from '@nado/ui-kit-icons-vue'
import { computed } from 'vue'

import { useFormSize } from '../../form'
import { nBadgeEmits, nBadgeProps } from './badge.model'

const props = defineProps(nBadgeProps)
const emit = defineEmits(nBadgeEmits)

const tagSize = useFormSize()
const ns = useNamespace('badge')
const classes = computed(() => {
  const { appearance, mod, closable, round } = props

  return [
    ns.b(),
    ns.is('closable', closable),
    ns.m(`appearance-${mod}-${appearance}`),
    ns.type('size', tagSize.value),
    ns.is('round', round),
  ]
})

// methods
const handleClose = (event: MouseEvent) => {
  emit('close', event)
}

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<script lang="ts">
export default {
  name: 'NTag',
}
</script>

<template>
  <span :class="classes" :style="{ backgroundColor: color }" @click="handleClick">
    <span :class="ns.e('content')">
      <slot />
    </span>
    <button v-if="closable" type="button" :class="ns.e('close')" @click.stop="handleClose">
      <NIconClose class="n-icon" :class="ns.e('close-icon')" />
    </button>
  </span>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-badge/index.css');
</style>
