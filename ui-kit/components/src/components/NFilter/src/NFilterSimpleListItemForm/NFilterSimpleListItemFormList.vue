<script setup lang="ts">
import { NFormItem } from '../../../NForm'
import { useFieldList } from '../hooks'
import {
  filterSimpleListItemFormListEmits,
  filterSimpleListItemFormListProps,
} from './NFilterSimpleListItemFormList.model'

const props = defineProps(filterSimpleListItemFormListProps)
const emit = defineEmits(filterSimpleListItemFormListEmits)
const { inValue, resetValues } = useFieldList(props)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleUpdateValue(payload: any) {
  inValue.value = payload
  emit('updateValue', payload ? { IN: payload } : undefined)
}

defineExpose({
  resetValues,
})
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItemFormList',
}
</script>

<template>
  <NFormItem class="n-filter-simple-list-item-form__value" label="Значение">
    <slot :name="`select-${field.name}`" :value="inValue" :update="handleUpdateValue" />
  </NFormItem>
</template>
