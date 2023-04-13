<script setup lang="ts">
import { NButton, NTooltip } from '@nado/ui-kit-vue'
</script>

<template>
  <div class="tooltip-base-box-m">
    <h2>More Content</h2>
    <NTooltip placement="top">
      <template #content> multiple lines<br />second line </template>
      <NButton>Top center</NButton>
    </NTooltip>
  </div>
</template>

<style scoped>
.tooltip-base-box-m {
  padding: 0 80px;
}

.tooltip-base-box-m .n-button {
  margin: 8px;
}
</style>
