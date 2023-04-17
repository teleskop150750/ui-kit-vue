<script lang="ts" setup>
import { NButton, NDrawer, NRadio, NRadioGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

import Nested from './Nested.vue'

const drawer = ref(false)
const drawer2 = ref(false)
const direction = ref<'rtl'>('rtl')
const radio1 = ref('Option 1')
const handleClose = (done: () => void) => {
  done()
}

function cancelClick() {
  drawer2.value = false
}

function confirmClick() {
  drawer2.value = false
}
</script>

<template>
  <h2>NDrawer</h2>
  <div class="row">
    <NRadioGroup v-model="direction">
      <NRadio value="ltr">left to right</NRadio>
      <NRadio value="rtl">right to left</NRadio>
      <NRadio value="ttb">top to bottom</NRadio>
      <NRadio value="btt">bottom to top</NRadio>
    </NRadioGroup>

    <NButton appearance="primary" style="margin-left: 16px" @click="drawer = true"> open </NButton>
    <NButton appearance="primary" style="margin-left: 16px" @click="drawer2 = true"> with footer </NButton>

    <NDrawer v-model="drawer" title="I am the title" :direction="direction" :before-close="handleClose">
      <span>Hi, there!</span>
    </NDrawer>
    <NDrawer v-model="drawer2" :direction="direction">
      <template #header>
        <h4>set title by slot</h4>
      </template>
      <template #default>
        <div>
          <NRadio v-model="radio1" label="Option 1" size="large">Option 1</NRadio>
          <NRadio v-model="radio1" label="Option 2" size="large">Option 2</NRadio>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <NButton @click="cancelClick">cancel</NButton>
          <NButton appearance="primary" @click="confirmClick">confirm</NButton>
        </div>
      </template>
    </NDrawer>
  </div>

  <Nested />
</template>
