<script setup lang="ts">
import { NFormItem } from '../../../form-item'
import {
  nFilterManagerFormCreateFilterFieldListEmits,
  nFilterManagerFormCreateFilterFieldListProps,
} from './filter-manager-form-create-filter-field-list.model'

defineProps(nFilterManagerFormCreateFilterFieldListProps)
const emit = defineEmits(nFilterManagerFormCreateFilterFieldListEmits)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleUpdateValue(payload: any) {
  emit('updateValue', payload ? { IN: payload } : undefined)
}
</script>

<script lang="ts">
export default {
  name: 'NFilterManagerFormCreateFilterFieldList',
}
</script>

<template>
  <NFormItem class="n-filter-manager-form-create-filter-field__body-field" :label="field.label">
    <slot :name="`select-${field.name}`" :value="field.value?.IN" :update="handleUpdateValue" />
  </NFormItem>
</template>
