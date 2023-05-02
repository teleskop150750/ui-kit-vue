<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { inject, onBeforeUnmount, watch } from 'vue'

import { popperArrowProps } from './NPopperArrow.model'
import { POPPER_CONTENT_INJECTION_KEY } from './tokens'

const props = defineProps(popperArrowProps)

const ns = useNamespace('popper')
const { arrowOffset, arrowRef, arrowStyle } = inject(POPPER_CONTENT_INJECTION_KEY, undefined)!

watch(
  () => props.arrowOffset,
  (val) => {
    arrowOffset.value = val
  },
)
onBeforeUnmount(() => {
  arrowRef.value = undefined
})

defineExpose({
  arrowRef,
})
</script>

<script lang="ts">
export default {
  name: 'NPopperArrow',
  inheritAttrs: false,
}
</script>

<template>
  <span ref="arrowRef" :class="ns.e('arrow')" :style="arrowStyle" data-popper-arrow />
</template>
