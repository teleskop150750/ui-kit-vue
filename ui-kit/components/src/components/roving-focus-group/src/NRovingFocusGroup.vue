<script setup lang="ts">
import NRovingFocusGroupImpl from './NRovingFocusGroupImpl.vue'
import { NCollection } from './roving-focus-group.model'
</script>

<script lang="ts">
export default {
  name: 'NRovingFocusGroup',
}
</script>

<template>
  <NCollection>
    <NRovingFocusGroupImpl v-bind="$attrs">
      <slot />
    </NRovingFocusGroupImpl>
  </NCollection>
</template>
