<script lang="ts" setup>
import { NButton, NMessage } from '@nado/ui-kit-vue'

const openCenter = () => {
  NMessage({
    showClose: true,
    message: 'Centered text',
    center: true,
  })
}
</script>

<template>
  <h2>Center</h2>
  <div class="row">
    <NButton plain @click="openCenter">Centered text</NButton>
  </div>
</template>
