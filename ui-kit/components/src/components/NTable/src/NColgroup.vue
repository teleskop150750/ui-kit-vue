<script setup lang="ts">
import { colgroupProps } from './NColgroup.model'

defineProps(colgroupProps)
</script>

<script lang="ts">
export default {
  name: 'NColgroup',
}
</script>

<template>
  <colgroup>
    <col v-for="col in columns" :key="col.name" :style="{ width: `${col.width}px` }" />
    <col />
  </colgroup>
</template>
