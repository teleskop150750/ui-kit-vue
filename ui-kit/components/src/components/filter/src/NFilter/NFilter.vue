<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { computed } from 'vue'

import { NInput } from '../../../input'
import { NOption, NSelect } from '../../../select'
import NFilterManager from '../NFilterManager/NFilterManager.vue'
import NFilterSimpleList from '../NFilterSimpleList/NFilterSimpleList.vue'
import type { Filter } from '../types'
import { getListFieldNames } from '../utils'
import { filterEmits, filterProps } from './filter.model'
import { useSearch } from './hooks'

const props = defineProps(filterProps)
const emit = defineEmits(filterEmits)

const ns = useNamespace('filter')
const { updateSearch, updateSearchFields } = useSearch(emit)
const listFields = computed(() => getListFieldNames(props.fields))

function saveFilter(payload: Filter) {
  let newFilters = [...props.filters]

  const oldNotSavedFilter = newFilters.find((el) => !el.isSaved)

  newFilters = newFilters.filter((el) => el.isSaved)

  if (oldNotSavedFilter) {
    emit('deleteFilter', oldNotSavedFilter)
  }

  newFilters.push(payload)

  emit('saveFilter', payload)
  emit('update:filter', payload)
  emit('update:filters', newFilters)
}

function updateFilter(payload: Filter) {
  const newFilters = [...props.filters].map((el) => {
    if (el.id !== payload.id) {
      return el
    }

    return payload
  })

  if (props.filter?.id === payload.id) {
    emit('update:filter', payload)
  }

  emit('updateFilter', payload)
  emit('update:filters', newFilters)
}

function deleteFilter(payload: Filter) {
  const newFilters = [...props.filters].filter((el) => el.id !== payload.id)

  emit('deleteFilter', payload)
  emit('update:filters', newFilters)

  if (newFilters.length === 0) {
    emit('update:filter', undefined)
  }
}

function selectFilter(payload: Filter) {
  if (payload.isSaved) {
    let newFilters = [...props.filters]
    const notSavedFilter = newFilters.find((el) => !el.isSaved)

    newFilters = newFilters.filter((el) => el.isSaved)

    if (notSavedFilter) {
      emit('deleteFilter', notSavedFilter)
      emit('update:filters', newFilters)
    }
  }

  emit('update:filter', payload)
}

function clearFilter() {
  emit('update:filter', undefined)
}
</script>

<script lang="ts">
export default {
  name: 'NFilter',
}
</script>

<template>
  <div :class="ns.b()">
    <NInput :model-value="search" :class="ns.e('search')" placeholder="Search" @update:model-value="updateSearch" />
    <NSelect
      :model-value="searchFields"
      :class="ns.e('search-fields')"
      multiple
      collapse-tags
      placeholder="Fields"
      @update:model-value="updateSearchFields"
    >
      <NOption v-for="item in searchFieldsOptions" :key="item.value" :label="item.label" :value="item.value" />
    </NSelect>
    <NFilterManager
      :filter="filter"
      :fields="fields"
      :visible-in-form="visibleInForm"
      :filters="filters"
      @save-filter="saveFilter"
      @update-filter="updateFilter"
      @delete-filter="deleteFilter"
      @clear-filter="clearFilter"
      @select-filter="selectFilter"
    >
      <template v-for="field in listFields" :key="field" #[`select-${field}`]="slotProps">
        <slot :name="`select-${field}`" v-bind="slotProps" />
      </template>
    </NFilterManager>
    <NFilterSimpleList :fields="fields" :filter="filter" @save-filter="saveFilter" @update-filter="updateFilter">
      <template v-for="field in listFields" :key="field" #[`select-${field}`]="slotProps">
        <slot :name="`select-${field}`" v-bind="slotProps" />
      </template>
    </NFilterSimpleList>
  </div>
</template>

<style>
.n-filter {
  display: flex;
  gap: 8px;
}

.n-filter__search {
  width: 200px;
}

.n-filter__search-fields {
  width: 200px;
}
</style>
