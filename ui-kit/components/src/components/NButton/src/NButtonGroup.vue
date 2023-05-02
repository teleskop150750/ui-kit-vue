<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { provide, reactive, toRef } from 'vue'

import { buttonGroupProps } from './NButtonGroup.model'
import { BUTTON_GROUP_INJECTION_KEY } from './tokens'

const props = defineProps(buttonGroupProps)

provide(
  BUTTON_GROUP_INJECTION_KEY,
  reactive({
    size: toRef(props, 'size'),
    appearance: toRef(props, 'appearance'),
  }),
)
const ns = useNamespace('button-group')
</script>

<script lang="ts">
export default {
  name: 'NButtonGroup',
}
</script>

<template>
  <div :class="`${ns.b()}`">
    <slot />
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-button/n-button-group/index.css');
</style>
