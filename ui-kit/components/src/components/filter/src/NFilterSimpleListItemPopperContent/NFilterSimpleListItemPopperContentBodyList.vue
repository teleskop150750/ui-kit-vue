<script setup lang="ts">
import { NOption, NSelect } from '../../../select'
import {
  nFilterSimpleListPopperContentBodyListEmits,
  nFilterSimpleListPopperContentBodyListProps,
} from './filter-simple-list-item-popper-content-body-list.model'
import { useFieldList } from './hooks'

const props = defineProps(nFilterSimpleListPopperContentBodyListProps)
const emit = defineEmits(nFilterSimpleListPopperContentBodyListEmits)
const { inValue, options, resetValues } = useFieldList(props)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSave(payload: any) {
  inValue.value = payload
  emit('updateValue', payload ? { IN: payload } : undefined)
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
    <NSelect
      :model-value="inValue"
      class="n-filter-simple-list-item-popper-content__select-value"
      placeholder="Select"
      multiple
      collapse-tags
      :max-collapse-tags="1"
      :teleported="false"
      @update:model-value="handleSave"
    >
      <NOption v-for="item in options" :key="item.key" :label="item.label" :value="item.value" />
    </NSelect>
  </div>
</template>
