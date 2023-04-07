<script lang="ts" setup>
import { NRadio, NRadioGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
const radio4 = ref('1')
</script>

<template>
  <h3>Border</h3>
  <div class="row">
    <NRadioGroup v-model="radio1">
      <NRadio value="1" size="large" border>Option A</NRadio>
      <NRadio value="2" size="large" border>Option B</NRadio>
    </NRadioGroup>
  </div>
  <div class="row">
    <NRadioGroup v-model="radio2">
      <NRadio value="1" border>Option A</NRadio>
      <NRadio value="2" border>Option B</NRadio>
    </NRadioGroup>
  </div>
  <div class="row">
    <NRadioGroup v-model="radio3" size="small">
      <NRadio value="1" border>Option A</NRadio>
      <NRadio value="2" border disabled>Option B</NRadio>
    </NRadioGroup>
  </div>
  <div class="row">
    <NRadioGroup v-model="radio4" size="small" disabled>
      <NRadio value="1" border>Option A</NRadio>
      <NRadio value="2" border>Option B</NRadio>
    </NRadioGroup>
  </div>
</template>
