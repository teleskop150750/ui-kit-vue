<script setup lang="ts">
import { NIconClose, NIconDeleteFilled } from '@nado/ui-kit-icons-vue'
import { isEqual } from '@nado/ui-kit-utils'
import { ref, watch } from 'vue'

import { NButton, NButtonGroup } from '../../../NButton'
import { NPopover } from '../../../NPopover'
import type { NFilterSimpleListItemFormInstance } from '../NFilterSimpleListItemForm/NFilterSimpleListItemForm.model'
import NFilterSimpleListItemForm from '../NFilterSimpleListItemForm/NFilterSimpleListItemForm.vue'
import { type FieldFilter, FieldFilterTypeMap } from '../types'
import { filterFilterListItemEmits, filterSimpleListItemProps } from './NFilterSimpleListItem.model'

const props = defineProps(filterSimpleListItemProps)
const emit = defineEmits(filterFilterListItemEmits)

const filterValueFormData = ref<FieldFilter['value']>(props.field.value)
const popperContentRef = ref<NFilterSimpleListItemFormInstance>()

function resetForm() {
  popperContentRef.value?.resetValues()
}

function removeField() {
  emit('delete', props.field)
}

function handleCloseForm() {
  updateFieldFilter()
}

function clearFieldFilter() {
  updateFormData()
  updateFieldFilter()
}

function updateFormData(payload: FieldFilter['value'] = undefined) {
  filterValueFormData.value = payload
}

function updateFieldFilter() {
  if (isEqual(props.field.value, filterValueFormData.value)) {
    return
  }

  const newField = { ...props.field }

  newField.value = filterValueFormData.value
  emit('update', newField)
}

watch(
  () => props.field.value,
  (val) => {
    filterValueFormData.value = val
  },
  {
    deep: true,
  },
)
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItem',
}
</script>

<template>
  <NButtonGroup appearance="primary">
    <NPopover trigger="click" :width="320" @before-enter="resetForm" @after-leave="handleCloseForm">
      <template #reference>
        <NButton mode="outline">
          {{ field.label }}
        </NButton>
      </template>
      <NFilterSimpleListItemForm ref="popperContentRef" :field="field" @update-value="updateFormData">
        <template v-if="field.type === FieldFilterTypeMap.LIST" #[`select-${field.name}`]="slotProps">
          <slot :name="`select-${field.name}`" v-bind="slotProps" />
        </template>
      </NFilterSimpleListItemForm>
    </NPopover>
    <NButton v-if="field.value" mode="outline" :icon="NIconClose" @click="clearFieldFilter" />
    <NButton mode="outline" :icon="NIconDeleteFilled" @click="removeField" />
  </NButtonGroup>
</template>
