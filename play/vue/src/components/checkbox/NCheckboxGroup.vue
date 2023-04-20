<script lang="ts" setup>
import { NCheckbox, NCheckboxGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const checkList = ref(['SD', 'A'])
</script>

<template>
  <h3>NCheckboxGroup</h3>
  <div class="row">
    <NCheckboxGroup v-model="checkList" class="line">
      <NCheckbox val="A">A</NCheckbox>
      <NCheckbox val="B">B</NCheckbox>
      <NCheckbox val="C">C</NCheckbox>
      <NCheckbox val="disabled" disabled>disabled</NCheckbox>
      <NCheckbox val="SD" disabled>SD</NCheckbox>
    </NCheckboxGroup>
  </div>
  <div class="row">
    {{ checkList }}
  </div>
</template>

<style scoped>
.line {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
