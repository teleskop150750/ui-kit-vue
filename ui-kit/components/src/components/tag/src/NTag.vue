<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { NIconClose } from '@nado/ui-kit-icons-vue'
import { computed } from 'vue'

import { useFormSize } from '../../form'
import { nTagEmits, nTagProps } from './tag.model'

const props = defineProps(nTagProps)
const emit = defineEmits(nTagEmits)

const tagSize = useFormSize()
const ns = useNamespace('tag')
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
function handleClose(event: MouseEvent) {
  emit('close', event)
}

function handleClick(event: MouseEvent) {
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
@import url('@nado/ui-kit-theme/src/components/n-tag/index.css');
</style>
