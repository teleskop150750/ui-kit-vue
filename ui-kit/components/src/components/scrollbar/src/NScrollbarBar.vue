<script setup lang="ts">
import type { Nillable } from '@nado/ui-kit-utils'
import { ref } from 'vue'

import NScrollbarThumb from './NScrollbarThumb.vue'
import { nBarProps } from './scrollbar-bar.model'

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
  scroll: handleScroll,
})
</script>

<script lang="ts">
export default {
  name: 'NScrollbarBar',
}
</script>

<template>
  <NScrollbarThumb :move="moveX" :ratio="ratioX" :size="width" :always="always" />
  <NScrollbarThumb :move="moveY" :ratio="ratioY" :size="height" vertical :always="always" />
</template>
