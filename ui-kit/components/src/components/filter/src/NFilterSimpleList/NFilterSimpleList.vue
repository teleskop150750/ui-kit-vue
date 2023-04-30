<script setup lang="ts">
import { ulid } from 'ulid'
import { computed, ref } from 'vue'

import { NDialog } from '../../../dialog'
import { NFormItem } from '../../../form-item'
import { NInput } from '../../../input'
import { NPortal } from '../../../portal'
import NFilterSimpleListButtonAdd from '../NFilterSimpleListButtonAdd/NFilterSimpleListButtonAdd.vue'
import NFilterSimpleListButtonSave from '../NFilterSimpleListButtonSave/NFilterSimpleListButtonSave.vue'
import NFilterSimpleListItem from '../NFilterSimpleListItem/NFilterSimpleListItem.vue'
import { type FieldFilter, type Filter, type FilterNotSaved, type FilterSaved } from '../types'
import { nFilterFilterListEmits, nFilterSimpleListProps } from './filter-simple-list.model'

const props = defineProps(nFilterSimpleListProps)
const emit = defineEmits(nFilterFilterListEmits)

const isVisibleSaveFilterForm = ref(false)
const formFilterName = ref('')
const canSaveFilter = computed(() => {
  if (!props.filter) {
    return false
  }

  return !props.filter.isSaved
})
const filterFields = computed(() => {
  if (!props.filter) {
    return []
  }

  return getCopyFields(props.filter)
})

function addField(field: FieldFilter) {
  if (props.filter) {
    const copyFields = getCopyFields(props.filter)

    if (copyFields.findIndex((el) => el.name === field.name) >= 0) {
      return
    }

    const newFilters = [...copyFields, field]

    if (props.filter !== undefined) {
      updateFilter(props.filter, newFilters)

      return
    }
  }

  createNotSavedFilter([field])
}

function updateField(payload: FieldFilter) {
  if (!props.filter) {
    return
  }

  const newFields = getCopyFields(props.filter).map((el) => {
    if (el.name === payload.name) {
      return payload
    }

    return el
  })

  createOrUpdateNotSavedFilter(newFields)
}

function deleteField(payload: FieldFilter) {
  if (!props.filter) {
    return
  }

  const newFields = getCopyFields(props.filter).filter((el) => el.name !== payload.name)

  createOrUpdateNotSavedFilter(newFields)
}

function createOrUpdateNotSavedFilter(newFields: FieldFilter[]) {
  if (!props.filter) {
    createNotSavedFilter(newFields)

    return
  }

  if (props.filter.isSaved) {
    createNotSavedFilter(newFields)

    return
  }

  updateFilter(props.filter, newFields)
}

function createNotSavedFilter(fields: FieldFilter[]) {
  const filter: FilterNotSaved = {
    id: ulid(),
    isSaved: false,
    fields,
  }

  emit('saveFilter', filter)
}

function updateFilter(oldFilter: Filter, fields: FieldFilter[]) {
  const newFilter = {
    ...oldFilter,
    fields,
  }

  emit('updateFilter', newFilter)
}

function getCopyFields(filter: Filter) {
  return [...filter.fields].map((el) => ({ ...el }))
}

function saveNotSavedFilter() {
  if (!props.filter) {
    return
  }

  const newFilter: FilterSaved = {
    ...props.filter,
    name: formFilterName.value,
    isSaved: true,
    fields: getCopyFields(props.filter),
  }

  isVisibleSaveFilterForm.value = false

  emit('updateFilter', newFilter)
}

function openForm() {
  isVisibleSaveFilterForm.value = true
}
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleList',
}
</script>

<template>
  <NFilterSimpleListItem
    v-for="field in filterFields"
    :key="field.name"
    :field="field"
    @delete="deleteField"
    @update="updateField"
  >
    <template #[`select-${field.name}`]="slotProps">
      <slot :name="`select-${field.name}`" v-bind="slotProps" />
    </template>
  </NFilterSimpleListItem>
  <NFilterSimpleListButtonAdd :fields="fields" :filter-fields="filterFields" @add="addField" />
  <NFilterSimpleListButtonSave v-if="canSaveFilter" :fields="fields" @click="openForm" />

  <NPortal>
    <NDialog v-model="isVisibleSaveFilterForm" title="Сохранить" width="30%" close-on-click-modal>
      <form @submit.prevent="saveNotSavedFilter">
        <NFormItem label="Название фильтра" prop="filterName">
          <NInput v-model="formFilterName" />
        </NFormItem>
      </form>
      <template #footer>
        <NButton @click="saveNotSavedFilter"> Сохранить </NButton>
      </template>
    </NDialog>
  </NPortal>
</template>
