<script lang="ts" setup>
import { NRadio, NRadioGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
</script>

<template>
  <h3>NRadio</h3>
  <div class="row">
    <NRadioGroup v-model="radio1" class="ml-4">
      <NRadio value="1" size="large">Large</NRadio>
      <NRadio value="2" size="large">Large</NRadio>
    </NRadioGroup>
  </div>
  <div class="row">
    <NRadioGroup v-model="radio2" class="ml-4">
      <NRadio value="1">Default</NRadio>
      <NRadio value="2">Default</NRadio>
    </NRadioGroup>
  </div>
  <div class="row">
    <NRadioGroup v-model="radio3" class="ml-4">
      <NRadio value="1" size="small">Small</NRadio>
      <NRadio value="2" size="small">Small</NRadio>
    </NRadioGroup>
  </div>
  <div class="row">
    <NRadioGroup v-model="radio3" disabled class="ml-4">
      <NRadio value="1" size="small">Disabled</NRadio>
      <NRadio value="2" size="small">Disabled</NRadio>
    </NRadioGroup>
  </div>
</template>
