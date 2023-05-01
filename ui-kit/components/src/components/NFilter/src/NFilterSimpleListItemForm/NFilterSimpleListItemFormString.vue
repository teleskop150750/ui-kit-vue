<script setup lang="ts">
import { NFormItem } from '../../../NFormItem'
import { NInput } from '../../../NInput'
import { useFieldString } from '../hooks'
import {
  filterSimpleListItemFormStringEmits,
  filterSimpleListItemFormStringProps,
} from './NFilterSimpleListItemFormString.model'

const props = defineProps(filterSimpleListItemFormStringProps)
const emit = defineEmits(filterSimpleListItemFormStringEmits)
const { likeValue, resetValues } = useFieldString(props)

function handleUpdateValue(payload: string) {
  likeValue.value = payload
  emit('updateValue', payload ? { LIKE: payload } : undefined)
}

defineExpose({
  resetValues,
})
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItemFormString',
}
</script>

<template>
  <NFormItem class="n-filter-simple-list-item-form__value" label="Значение">
    <NInput :model-value="likeValue" @update:model-value="handleUpdateValue" />
  </NFormItem>
</template>
