<script setup lang="ts">
import { nColgroupProps } from './colgroup.model'

defineProps(nColgroupProps)
</script>

<script lang="ts">
export default {
  name: 'NColgroup',
}
</script>

<template>
  <colgroup>
    <col v-for="col in columns" :key="col.name" :style="{ width: `${col.width}px` }" />
  </colgroup>
</template>
