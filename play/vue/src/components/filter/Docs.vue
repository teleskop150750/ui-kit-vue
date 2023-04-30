<script setup lang="ts">
import { type FieldFilter, type Filter, NFilter, NOption, NSelect, type SearchField } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const options = [
  {
    key: 1,
    value: 'Option1',
    label: 'Option1',
  },
  {
    key: 2,
    value: 'Option2',
    label: 'Option2',
  },
  {
    key: 3,
    value: 'Option3',
    label: 'Option3',
  },
  {
    key: 4,
    value: 'Option4',
    label: 'Option4',
  },
  {
    key: 5,
    value: 'Option5',
    label: 'Option5',
  },
]

const searchFieldsOptions = ref<SearchField[]>([
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'age',
    label: 'Age',
  },
])

const filterFields = ref<FieldFilter[]>([
  {
    name: 'name',
    label: 'Name',
    type: 'string',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
  },
  {
    name: 'list',
    label: 'List',
    type: 'list',
  },
])

const search = ref('')
const searchFields = ref([])
const filters = ref<Filter[]>([])
const filter = ref<Filter | undefined>(undefined)

function saveFilter() {
  // filters.value.push(payload)
  // filter.value = payload
}

function deleteFilter() {
  // filters.value = filters.value.filter((el) => el.id !== payload.id)
  // if (filters.value.length === 0) {
  //   filter.value = undefined
  // }
}
</script>

<template>
  <div>
    <h2 class="n-title-2">NFilter</h2>
    <div>
      <NFilter
        v-model:search="search"
        v-model:filter="filter"
        v-model:filters="filters"
        v-model:search-fields="searchFields"
        :search-fields-options="searchFieldsOptions"
        :fields="filterFields"
        :visible-in-form="['name', 'age']"
        @save-filter="saveFilter"
        @delete-filter="deleteFilter"
      >
        <template #select-list="{ value, update }">
          <NSelect
            :model-value="value"
            class="n-filter-simple-list-item-form__value"
            placeholder="Select"
            multiple
            collapse-tags
            :max-collapse-tags="1"
            :teleported="false"
            @update:model-value="update"
          >
            <NOption v-for="item in options" :key="item.key" :label="item.label" :value="item.value" />
          </NSelect>
        </template>
      </NFilter>
    </div>
  </div>

  <!-- <div>
    <pre>{{ filterFields }}</pre>
  </div> -->
  <!-- <div>
    <pre>Docs | {{ simpleFilterFields }}</pre>
  </div> -->
  <div>
    <pre>Search | {{ search }}</pre>
  </div>
  <div>
    <pre>Search Fields | {{ searchFields }}</pre>
  </div>
  <div>
    <pre>Filter | {{ filter }}</pre>
  </div>
  <div>
    <pre>Filters | {{ filters }}</pre>
  </div>
  <div>
    <pre>Field | {{ filterFields }}</pre>
  </div>
</template>
