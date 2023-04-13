<script setup lang="ts">
import { NButton, NTooltip } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const advanced = ref(false)
</script>

<template>
  <div class="tooltip-base-box-m">
    <h2>Advanced usage</h2>
    <NTooltip :disabled="advanced" content="click to close tooltip function" placement="bottom" effect="light">
      <NButton @click="advanced = !advanced">click to {{ advanced ? 'active' : 'close' }} tooltip function</NButton>
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
