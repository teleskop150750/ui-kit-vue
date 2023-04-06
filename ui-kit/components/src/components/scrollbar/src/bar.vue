<script setup lang="ts">
import type { Nillable } from '@nado/ui-kit-utils'
import { ref } from 'vue'

import { nBarProps } from './bar.model'
import NThumb from './thumb.vue'

const props = defineProps(nBarProps)

const moveX = ref(0)
const moveY = ref(0)

function handleScroll(wrap: Nillable<HTMLElement>) {
  if (!wrap) {
    return
  }

  const { offsetHeight, scrollTop } = wrap
  const { offsetWidth, scrollLeft } = wrap

  moveY.value = Number(((scrollTop / offsetHeight) * 100 * props.ratioY).toFixed(2))
  moveX.value = Number(((scrollLeft / offsetWidth) * 100 * props.ratioX).toFixed(2))
}

defineExpose({
  handleScroll,
})
</script>

<script lang="ts">
export default {
  name: 'NScrollbarBar',
}
</script>

<template>
  <NThumb :move="moveX" :ratio="ratioX" :size="width" :always="always" />
  <NThumb :move="moveY" :ratio="ratioY" :size="height" vertical :always="always" />
</template>
