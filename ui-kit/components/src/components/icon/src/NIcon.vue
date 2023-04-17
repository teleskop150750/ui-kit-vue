<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { addUnit, isUndefined } from '@nado/ui-kit-utils'
import { computed, type CSSProperties } from 'vue'

import { nIconProps } from './icon.model'

const props = defineProps(nIconProps)

const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  const { size, color } = props

  if (!size && !color) {
    return {}
  }

  return {
    fontSize: isUndefined(size) ? undefined : addUnit(size),
    '--n-comp-icon-color': color,
  }
})
</script>

<script lang="ts">
export default {
  name: 'NIcon',
  inheritAttrs: false,
}
</script>

<template>
  <span :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </span>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-icon/index.css');
</style>
