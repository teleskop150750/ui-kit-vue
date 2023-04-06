<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'

import { nTdProps } from './td.model'

defineProps(nTdProps)
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
