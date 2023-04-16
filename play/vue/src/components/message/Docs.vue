<script lang="ts" setup>
import { NButton, NMessage } from '@nado/ui-kit-vue'
import { h } from 'vue'

import Center from './Center.vue'
import Closable from './Closable.vue'
import Grouping from './Grouping.vue'
import HTML from './HTML.vue'

const open = () => {
  NMessage('this is a message.')
}

const openVn = () => {
  NMessage({
    message: h('p', undefined, [h('span', undefined, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
  })
}

const open1 = () => {
  NMessage('this is a message.')
}
const open2 = () => {
  NMessage({
    message: 'Congrats, this is a success message.',
    appearance: 'success',
  })
}
const open3 = () => {
  NMessage({
    message: 'Warning, this is a warning message.',
    appearance: 'warning',
  })
}
const open4 = () => {
  NMessage.danger!('Oops, this is a error message.')
}
</script>

<template>
  <h1>Message</h1>
  <h2>Basic</h2>
  <div class="row">
    <NButton :plain="true" @click="open">Show message</NButton>
    <NButton :plain="true" @click="openVn">VNode</NButton>
  </div>

  <h2>Appearance</h2>
  <div class="row">
    <NButton :plain="true" @click="open2">success</NButton>
    <NButton :plain="true" @click="open3">warning</NButton>
    <NButton :plain="true" @click="open1">message</NButton>
    <NButton :plain="true" @click="open4">error</NButton>
  </div>

  <Closable />
  <Center />
  <HTML />
  <Grouping />
</template>
