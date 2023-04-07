<script lang="ts" setup>
import { NRadioButton, NRadioGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const radio1 = ref('New York')
const radio2 = ref('New York')
const radio3 = ref('New York')
</script>

<template>
  <h3>NRadioGroup</h3>
  <div class="row">
    <NRadioGroup v-model="radio1" size="large">
      <NRadioButton value="New York" />
      <NRadioButton value="Washington" />
      <NRadioButton value="Los Angeles" />
      <NRadioButton value="Chicago" />
    </NRadioGroup>
  </div>
  <div class="row">
    <NRadioGroup v-model="radio2">
      <NRadioButton value="New York" />
      <NRadioButton value="Washington" />
      <NRadioButton value="Los Angeles" />
      <NRadioButton value="Chicago" />
    </NRadioGroup>
  </div>
  <div class="row">
    <NRadioGroup v-model="radio3" size="small">
      <NRadioButton value="New York" disabled />
      <NRadioButton value="Washington" disabled />
      <NRadioButton value="Los Angeles" />
      <NRadioButton value="Chicago" />
    </NRadioGroup>
  </div>
</template>
