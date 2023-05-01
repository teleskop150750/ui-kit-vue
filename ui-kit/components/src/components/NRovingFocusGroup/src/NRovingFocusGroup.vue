<script setup lang="ts">
import { NCollection } from './NRovingFocusGroup.model'
import NRovingFocusGroupImpl from './NRovingFocusGroupImpl.vue'
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
