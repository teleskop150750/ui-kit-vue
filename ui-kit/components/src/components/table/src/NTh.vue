<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'

import { nThProps } from './th.model'

defineProps(nThProps)
const ns = useNamespace('table')
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
