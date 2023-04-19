<script setup lang="ts">
import { NTable, type NTableColumn, NTd } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const isBody = ref(false)

const columns = ref<NTableColumn[]>([
  {
    field: 'id',
    label: 'id',
    name: 'id',
    sortable: true,
    width: 100,
  },
  {
    field: 'name',
    label: 'name',
    name: 'name',
    sortable: true,
    width: 300,
  },
  {
    field: 'age',
    label: 'age',
    name: 'age',
    sortable: true,
    width: 200,
  },
  {
    field: 'foo',
    label: 'foo',
    name: 'foo',
    sortable: true,
    width: 200,
  },
  {
    field: 'bar',
    label: 'bar',
    name: 'bar',
    sortable: true,
    width: 200,
  },
])

const rows = [
  {
    id: 1,
    name: 'name 1',
    age: 20,
    foo: 1,
    bar: 'bar',
  },
  {
    id: 2,
    name: 'name 1',
    age: 40,
    foo: 1,
    bar: 'bar',
  },
  {
    id: 3,
    name: 'name 1',
    age: 30,
    foo: 1,
    bar: 'bar',
  },
]
</script>

<template>
  <div class="demo">
    <button type="button" @click="isBody = !isBody">button</button>

    <hr />

    <div class="table-wrapper">
      <NTable v-model:columns="columns" :rows="rows">
        <template #body-cell-name>
          <NTd>
            <div class="my-table-details">1</div>
          </NTd>
        </template>
      </NTable>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  padding: 1rem;
}
</style>
