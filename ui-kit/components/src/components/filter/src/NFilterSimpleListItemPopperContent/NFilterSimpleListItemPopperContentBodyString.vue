<script setup lang="ts">
import { NInput } from '../../../input'
import {
  nFilterSimpleListPopperContentBodyStringEmits,
  nFilterSimpleListPopperContentBodyStringProps,
} from './filter-simple-list-item-popper-content-body-string.model'
import { useFieldString } from './hooks'

const props = defineProps(nFilterSimpleListPopperContentBodyStringProps)
const emit = defineEmits(nFilterSimpleListPopperContentBodyStringEmits)
const { likeValue, resetValues } = useFieldString(props)

function handleSave(payload: string) {
  likeValue.value = payload
  emit('updateValue', payload ? { LIKE: payload } : undefined)
}

defineExpose({
  resetValues,
})
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItemPopperContentBodyString',
}
</script>

<template>
  <div class="n-filter-simple-list-item-popper-content__body-inner">
    <div class="n-filter-simple-list-item-popper-content__select-value">
      <NInput :model-value="likeValue" @update:model-value="handleSave" />
    </div>
  </div>
</template>
