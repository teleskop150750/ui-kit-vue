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
    type: toRef(props, 'type'),
  }),
)
const ns = useNamespace('button-group')
</script>

<template>
  <div :class="`${ns.b()}`">
    <slot />
  </div>
</template>
