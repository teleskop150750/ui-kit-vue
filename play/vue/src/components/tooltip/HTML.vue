<script setup lang="ts">
import { NButton, NTooltip } from '@nado/ui-kit-vue'
</script>

<template>
  <div class="tooltip-base-box-m">
    <h2>HTML as content</h2>
    <NTooltip content="<span>The content can be <strong>HTML</strong></span>" raw-content>
      <NButton>hover me</NButton>
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
