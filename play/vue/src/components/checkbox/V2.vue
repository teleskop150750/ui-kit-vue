<script lang="ts" setup>
import { NCheckbox, NCheckboxGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const checkList = ref(['selected and disabled', 'Option A'])
</script>

<template>
  <h3>NCheckboxGroup</h3>
  <div class="row">
    <NCheckboxGroup v-model="checkList" class="line">
      <NCheckbox label="Option A" />
      <NCheckbox label="Option B" />
      <NCheckbox label="Option C" />
      <NCheckbox label="disabled" disabled />
      <NCheckbox label="selected and disabled" disabled />
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
