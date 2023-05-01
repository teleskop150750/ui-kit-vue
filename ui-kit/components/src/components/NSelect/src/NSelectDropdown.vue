<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { useResizeObserver } from '@vueuse/core'
import { computed, inject, onMounted, ref } from 'vue'

import { SELECT_INJECTION_KEY } from './token'

const select = inject(SELECT_INJECTION_KEY)!
const ns = useNamespace('select')

// computed
const popperClass = computed(() => select.props.popperClass)
const isMultiple = computed(() => select.props.multiple)
const isFitInputWidth = computed(() => select.props.fitInputWidth)
const minWidth = ref('')

function updateMinWidth() {
  minWidth.value = `${select.selectRootRef?.offsetWidth}px`
}

onMounted(() => {
  // TODO: updatePopper
  // popper.value.update()
  updateMinWidth()
  useResizeObserver(select.selectRootRef, updateMinWidth)
})
</script>

<script lang="ts">
export default {
  name: 'NSelectDropdown',
}
</script>

<template>
  <div
    :class="[ns.b('dropdown'), ns.is('multiple', isMultiple), popperClass]"
    :style="{ [isFitInputWidth ? 'width' : 'minWidth']: minWidth }"
  >
    <slot />
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-select/n-select-dropdown/index.css');
</style>
