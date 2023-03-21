<script lang="ts" setup>
import { useNamespace } from '@ui/hooks'
import { BUTTON_GROUP_INJECTION_KEY } from '@ui/tokens'
import { provide, reactive, toRef } from 'vue'

import { nButtonGroupProps } from './button-group.model'

const props = defineProps(nButtonGroupProps)

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
