<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'

import { tdProps } from './NTd.model'

defineProps(tdProps)
const ns = useNamespace('table')
</script>

<script lang="ts">
export default {
  name: 'NTd',
}
</script>

<template>
  <td :class="ns.e('td')">
    <slot />
  </td>
</template>
