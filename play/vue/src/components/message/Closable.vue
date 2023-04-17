<script lang="ts" setup>
import { NButton, NMessage } from '@nado/ui-kit-vue'

const open1 = () => {
  NMessage({
    showClose: true,
    message: 'This is a message.',
  })
}
const open2 = () => {
  NMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    appearance: 'success',
  })
}
const open3 = () => {
  NMessage({
    showClose: true,
    message: 'Warning, this is a warning message.',
    appearance: 'warning',
  })
}
const open4 = () => {
  NMessage({
    showClose: true,
    message: 'Oops, this is a error message.',
    appearance: 'danger',
  })
}
</script>

<template>
  <h2>Closable</h2>
  <div class="row">
    <NButton :plain="true" @click="open1">message</NButton>
    <NButton :plain="true" @click="open2">success</NButton>
    <NButton :plain="true" @click="open3">warning</NButton>
    <NButton :plain="true" @click="open4">error</NButton>
  </div>
</template>
