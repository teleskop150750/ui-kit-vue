<script setup lang="ts">
import NFilterSimpleListButtonAdd from '../NFilterSimpleListButtonAdd/NFilterSimpleListButtonAdd.vue'
import NFilterSimpleListButtonSave from '../NFilterSimpleListButtonSave/NFilterSimpleListButtonSave.vue'
import NFilterSimpleListItem from '../NFilterSimpleListItem/NFilterSimpleListItem.vue'
import type { FilterField } from '../types'
import { nFilterFilterListEmits, nFilterSimpleListProps } from './filter-simple-list.model'

const props = defineProps(nFilterSimpleListProps)
const emit = defineEmits(nFilterFilterListEmits)

function handleAddField(payload: FilterField) {
  if ([...props.selectedFields].findIndex((el) => el.name === payload.name) >= 0) {
    return
  }

  emit('update:selectedFields', [...props.selectedFields, payload])
}

function handleUpdateField(payload: FilterField) {
  const result = [...props.selectedFields].map((el) => {
    if (el.name === payload.name) {
      return payload
    }

    return el
  })

  emit('update:selectedFields', result)
}

function handleDeleteField(payload: FilterField) {
  const fieldIndex = props.selectedFields.findIndex((el) => el.name === payload.name)

  if (fieldIndex < 0) {
    return
  }

  const newList = [...props.selectedFields]

  newList.splice(fieldIndex, 1)
  emit('update:selectedFields', newList)
}
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleList',
}
</script>

<template>
  <NFilterSimpleListItem
    v-for="item in selectedFields"
    :key="item.name"
    :field="item"
    @delete="handleDeleteField"
    @update="handleUpdateField"
  >
    <template #[item.name]>
      <slot :name="item.name" />
    </template>
  </NFilterSimpleListItem>
  <NFilterSimpleListButtonAdd :fields="fields" :selected-fields="selectedFields" @add="handleAddField" />
  <NFilterSimpleListButtonSave :fields="fields" />
</template>
