<script lang="ts" setup>
import { NButton, NMessage } from '@nado/ui-kit-vue'

const openHTML = () => {
  NMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  })
}
</script>

<template>
  <h2>HTML</h2>
  <div class="row">
    <NButton :plain="true" @click="openHTML">Use HTML String</NButton>
  </div>
</template>
