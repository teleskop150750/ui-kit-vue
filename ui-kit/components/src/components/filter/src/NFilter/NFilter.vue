<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { computed, ref } from 'vue'

import { NInput } from '../../../input'
import { NOption, NSelect } from '../../../select'
import NFilterManager from '../NFilterManager/NFilterManager.vue'
import NFilterSimpleList from '../NFilterSimpleList/NFilterSimpleList.vue'
import type { FieldFilter, Filter } from '../types'
import { getListFieldNames } from '../utils'
import { nFilterEmits, nFilterProps } from './filter.model'

const props = defineProps(nFilterProps)
const emit = defineEmits(nFilterEmits)
const ns = useNamespace('filter')

const searchValue = ref('')
const searchFilterValue = ref([])
const listFields = computed(() => getListFieldNames(props.fields))

function updateHandle(payload: FieldFilter[]) {
  emit('update:simpleFields', payload)
}

function saveFilter(payload: Filter) {
  let filtersCopy = [...props.filters]

  const filtersNotSaved = filtersCopy.find((el) => !el.isSaved)

  filtersCopy = filtersCopy.filter((el) => el.isSaved)

  if (filtersNotSaved) {
    emit('deleteFilter', filtersNotSaved)
  }

  filtersCopy.push(payload)

  emit('saveFilter', payload)
  emit('update:filter', payload)
  emit('update:filters', filtersCopy)
}

function updateFilter(payload: Filter) {
  const filtersCopy = [...props.filters].map((el) => {
    if (el.id !== payload.id) {
      return el
    }

    return payload
  })

  if (props.filter?.id === payload.id) {
    emit('update:filter', payload)
  }

  emit('updateFilter', payload)
  emit('update:filters', filtersCopy)
}

function deleteFilter(payload: Filter) {
  const filtersCopy = [...props.filters].filter((el) => el.id !== payload.id)

  emit('deleteFilter', payload)
  emit('update:filters', filtersCopy)

  if (filtersCopy.length === 0) {
    emit('update:filter', undefined)
  }
}

function selectFilter(payload: Filter) {
  if (payload.isSaved) {
    let filtersCopy = [...props.filters]
    const filtersNotSaved = filtersCopy.find((el) => !el.isSaved)

    filtersCopy = filtersCopy.filter((el) => el.isSaved)

    if (filtersNotSaved) {
      emit('deleteFilter', filtersNotSaved)
      emit('update:filters', filtersCopy)
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
    <NInput v-model="searchValue" :class="ns.e('search')" placeholder="Search" />
    <NSelect v-model="searchFilterValue" :class="ns.e('search-fields')" multiple collapse-tags placeholder="Fields">
      <NOption v-for="item in searchFields" :key="item.value" :label="item.label" :value="item.value" />
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
    <NFilterSimpleList :fields="fields" :selected-fields="simpleFields" @update:selected-fields="updateHandle">
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
