<script setup lang="ts">
import NFilterSimpleListButtonAdd from '../NFilterSimpleListButtonAdd/NFilterSimpleListButtonAdd.vue'
import NFilterSimpleListButtonSave from '../NFilterSimpleListButtonSave/NFilterSimpleListButtonSave.vue'
import NFilterSimpleListItem from '../NFilterSimpleListItem/NFilterSimpleListItem.vue'
import { type FieldFilter } from '../types'
import { nFilterFilterListEmits, nFilterSimpleListProps } from './filter-simple-list.model'

const props = defineProps(nFilterSimpleListProps)
const emit = defineEmits(nFilterFilterListEmits)

function handleAddField(payload: FieldFilter) {
  if ([...props.selectedFields].findIndex((el) => el.name === payload.name) >= 0) {
    return
  }

  emit('update:selectedFields', [...props.selectedFields, payload])
}

function handleUpdateField(payload: FieldFilter) {
  const result = [...props.selectedFields].map((el) => {
    if (el.name === payload.name) {
      return payload
    }

    return el
  })

  emit('update:selectedFields', result)
}

function handleDeleteField(payload: FieldFilter) {
  const newList = [...props.selectedFields].filter((el) => el.name !== payload.name)

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
    v-for="field in selectedFields"
    :key="field.name"
    :field="field"
    @delete="handleDeleteField"
    @update="handleUpdateField"
  >
    <template #[`select-${field.name}`]="slotProps">
      <slot :name="`select-${field.name}`" v-bind="slotProps" />
    </template>
  </NFilterSimpleListItem>
  <NFilterSimpleListButtonAdd :fields="fields" :selected-fields="selectedFields" @add="handleAddField" />
  <NFilterSimpleListButtonSave :fields="fields" />
</template>
