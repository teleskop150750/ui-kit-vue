<script lang="ts" setup>
import { NCheckbox } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(true)
const checked6 = ref(false)
</script>

<template>
  <h3>Base</h3>
  <div class="row">
    <NCheckbox v-model="checked1" label="Large 1" size="large" />
    <NCheckbox v-model="checked2" label="Large 2" size="large" />
  </div>
  <div class="row">
    <NCheckbox v-model="checked3" label="Default 1" />
    <NCheckbox v-model="checked4" label="Default 2" />
  </div>
  <div class="row">
    <NCheckbox v-model="checked5" label="Small 1" size="small" />
    <NCheckbox v-model="checked6" label="Small 2" size="small" />
  </div>
  <div class="row">
    <NCheckbox v-model="checked5" label="Disabled 1" size="small" disabled />
    <NCheckbox v-model="checked6" label="Disabled 2" size="small" disabled />
  </div>
</template>
