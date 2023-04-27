<script setup lang="ts">
import { type FilterField, NFilter, type SearchField } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const searchFields = ref<SearchField[]>([
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

const simpleFilterFields = ref<FilterField[]>([])

const filterFields = ref<FilterField[]>([
  {
    name: 'name',
    label: 'Name',
    type: 'string',
    isVisibleInModel: true,
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    isVisibleInModel: false,
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    isVisibleInModel: true,
  },
  {
    name: 'list',
    label: 'List',
    type: 'list',
    isVisibleInModel: true,
    options: [
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
    ],
  },
])
</script>

<template>
  <div>
    <h2 class="n-title-2">NFilter</h2>
    <div>
      <NFilter v-model:simple-fields="simpleFilterFields" :search-fields="searchFields" :fields="filterFields">
        >
        <template #age>
          <h2>test</h2>
        </template>
      </NFilter>
    </div>
  </div>

  <!-- <div>
    <pre>{{ filterFields }}</pre>
  </div> -->
  <div>
    <pre>Docs | {{ simpleFilterFields }}</pre>
  </div>
</template>
