<script setup lang="ts">
import { NButton, NTooltip } from '@nado/ui-kit-vue'
</script>

<template>
  <div class="tooltip-base-box-m">
    <h2>Theme</h2>
    <NTooltip content="Top center" placement="top">
      <NButton>Dark</NButton>
    </NTooltip>
    <NTooltip content="Bottom center" placement="bottom" effect="light">
      <NButton>Light</NButton>
    </NTooltip>
    <NTooltip content="Bottom center" effect="customized">
      <NButton>Customized theme</NButton>
    </NTooltip>
  </div>
</template>

<style>
.n-popper--effect-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;

  background: linear-gradient(90deg, rgb(159 229 151), rgb(204 229 129));
}

.n-popper--effect-customized .n-popper__arrow::before {
  right: 0;

  background: linear-gradient(45deg, hsl(95deg 64% 73%), hsl(87deg 65% 72%));
}

.tooltip-base-box-m {
  padding: 0 80px;
}

.tooltip-base-box-m .n-button {
  margin: 8px;
}
</style>
