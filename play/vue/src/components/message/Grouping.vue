<script lang="ts" setup>
import { NButton, NMessage } from '@nado/ui-kit-vue'

const open = () => {
  NMessage({
    message: 'this is a message.',
    grouping: true,
    appearance: 'success',
  })
}
</script>

<template>
  <h2>Grouping</h2>
  <div class="row">
    <NButton :plain="true" @click="open">Show message</NButton>
  </div>
</template>
