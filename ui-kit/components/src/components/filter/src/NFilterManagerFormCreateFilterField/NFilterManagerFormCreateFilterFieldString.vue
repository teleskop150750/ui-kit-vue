<script setup lang="ts">
import { NFormItem } from '../../../form-item'
import {
  nFilterManagerFormCreateFilterFieldStringEmits,
  nFilterManagerFormCreateFilterFieldStringProps,
} from './filter-manager-form-create-filter-field-string.model'

defineProps(nFilterManagerFormCreateFilterFieldStringProps)
const emit = defineEmits(nFilterManagerFormCreateFilterFieldStringEmits)

function handleUpdateValue(payload: string) {
  emit('updateValue', payload ? { LIKE: payload } : undefined)
}
</script>

<script lang="ts">
export default {
  name: 'NFilterManagerFormCreateFilterFieldString',
}
</script>

<template>
  <NFormItem class="n-filter-manager-form-create-filter-field__body-field" :label="field.label">
    <NInput :model-value="field.value?.LIKE" @update:model-value="handleUpdateValue" />
  </NFormItem>
</template>

<style>
.n-filter-manager-form-create-filter-field {
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 16px;
  align-items: flex-end;
}
</style>
