<script lang="ts" setup>
import { NIconShare } from '@nado/ui-kit-icons-vue'
import { NBadge, NButton } from '@nado/ui-kit-vue'
</script>

<template>
  <h1>NBadge</h1>
  <div class="row">
    <NBadge :value="12" class="item">
      <NButton>comments</NButton>
    </NBadge>
    <NBadge :value="3" class="item" appearance="success">
      <NButton>replies</NButton>
    </NBadge>
    <NBadge :value="1" class="item" appearance="primary">
      <NButton>comments</NButton>
    </NBadge>
    <NBadge :value="2" class="item" appearance="warning">
      <NButton>replies</NButton>
    </NBadge>
  </div>

  <h2>Max Value</h2>
  <div class="row">
    <NBadge :value="100" :max="10" class="item" appearance="warning">
      <NButton>replies</NButton>
    </NBadge>
  </div>

  <h2>Customizations</h2>
  <div class="row">
    <NBadge value="new" class="item">
      <NButton>comments</NButton>
    </NBadge>
    <NBadge value="hot" class="item">
      <NButton>replies</NButton>
    </NBadge>
  </div>

  <h2>Red Dot</h2>
  <div class="row">
    <NBadge is-dot class="item">query</NBadge>
    <NBadge is-dot class="item">
      <NButton class="share-button" :icon="NIconShare" appearance="primary" />
    </NBadge>
  </div>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
