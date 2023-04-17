<script setup lang="ts">
import { NButton, NTooltip } from '@nado/ui-kit-vue'
</script>

<template>
  <div>
    <div class="tooltip-base-box">
      <h2>Basic usage</h2>
      <div class="row center">
        <NTooltip class="box-item" effect="dark" content="top Left prompts info" placement="top-start">
          <NButton>top-start</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="dark" content="top Center prompts info" placement="top">
          <NButton>top</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="dark" content="top Right prompts info" placement="top-end">
          <NButton>top-end</NButton>
        </NTooltip>
      </div>
      <div class="row">
        <NTooltip class="box-item" effect="dark" content="Left Top prompts info" placement="left-start">
          <NButton>left-start</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="dark" content="Right Top prompts info" placement="right-start">
          <NButton>right-start</NButton>
        </NTooltip>
      </div>
      <div class="row">
        <NTooltip class="box-item" effect="dark" content="Left Center prompts info" placement="left">
          <NButton class="mt-3 mb-3"> left </NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="dark" content="Right Center prompts info" placement="right">
          <NButton>right</NButton>
        </NTooltip>
      </div>
      <div class="row">
        <NTooltip class="box-item" effect="dark" content="Left Bottom prompts info" placement="left-end">
          <NButton>left-end</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="dark" content="Right Bottom prompts info" placement="right-end">
          <NButton>right-end</NButton>
        </NTooltip>
      </div>
      <div class="row center">
        <NTooltip class="box-item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
          <NButton>bottom-start</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="dark" content="Bottom Center prompts info" placement="bottom">
          <NButton>bottom</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
          <NButton>bottom-end</NButton>
        </NTooltip>
      </div>
    </div>

    <div class="tooltip-base-box">
      <div class="row center">
        <NTooltip class="box-item" effect="light" content="top Left prompts info" placement="top-start">
          <NButton>top-start</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="light" content="top Center prompts info" placement="top">
          <NButton>top</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="light" content="top Right prompts info" placement="top-end">
          <NButton>top-end</NButton>
        </NTooltip>
      </div>
      <div class="row">
        <NTooltip class="box-item" effect="light" content="Left Top prompts info" placement="left-start">
          <NButton>left-start</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="light" content="Right Top prompts info" placement="right-start">
          <NButton>right-start</NButton>
        </NTooltip>
      </div>
      <div class="row">
        <NTooltip class="box-item" effect="light" content="Left Center prompts info" placement="left">
          <NButton class="mt-3 mb-3"> left </NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="light" content="Right Center prompts info" placement="right">
          <NButton>right</NButton>
        </NTooltip>
      </div>
      <div class="row">
        <NTooltip class="box-item" effect="light" content="Left Bottom prompts info" placement="left-end">
          <NButton>left-end</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="light" content="Right Bottom prompts info" placement="right-end">
          <NButton>right-end</NButton>
        </NTooltip>
      </div>
      <div class="row center">
        <NTooltip class="box-item" effect="light" content="Bottom Left prompts info" placement="bottom-start">
          <NButton>bottom-start</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="light" content="Bottom Center prompts info" placement="bottom">
          <NButton>bottom</NButton>
        </NTooltip>
        <NTooltip class="box-item" effect="light" content="Bottom Right prompts info" placement="bottom-end">
          <NButton>bottom-end</NButton>
        </NTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-base-box {
  width: 600px;
  margin: 0 auto;
  padding: 40px 0;
}

.tooltip-base-box .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tooltip-base-box .center {
  justify-content: center;
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
