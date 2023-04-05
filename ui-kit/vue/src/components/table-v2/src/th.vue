<script lang="ts" setup>
import { useNamespace } from '@ui/hooks'

import { nThProps } from './th.model'

defineProps(nThProps)
const ns = useNamespace('table-v2')
</script>

<script lang="ts">
export default {
  name: 'NTh',
}
</script>

<template>
  <th :class="ns.e('th')">
    <slot />
  </th>
</template>
