<script setup lang="ts">
import { NTable, type NTableColumn, NTd } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const columns = ref<NTableColumn[]>([
  {
    field: 'id',
    label: 'id',
    name: 'id',
    isSortable: true,
    isResizable: true,
    isOrderable: false,
    width: 181,
    align: 'right',
    minWidth: 100,
    sortOrder: 'ASC',
    isRequired: true,
  },
  {
    field: 'name',
    label: 'name',
    name: 'name',
    isSortable: true,
    isResizable: true,
    width: 300,
    minWidth: 100,
  },
  {
    field: 'age',
    label: 'age',
    name: 'age',
    isResizable: true,
    isOrderable: false,
    width: 200,
  },
  {
    field: 'foo',
    label: 'foo',
    name: 'foo',
    isSortable: true,
    width: 200,
  },
  {
    field: 'bar',
    label: 'bar',
    name: 'bar',
    isResizable: true,
    width: 200,
  },
])

const rows = Array.from({ length: 34 }).map((_, idx) => ({
  id: idx + 1,
  name: 'name',
  age: 20,
  foo: 'foo',
  bar: 'bar',
}))

const page = ref(3)
</script>

<template>
  <div class="demo">
    <div>Page | {{ page }}</div>

    <hr />

    <div class="body">
      <NTable v-model:columns="columns" v-model:current-page="page" :rows="rows" query-type="number">
        <template #body-cell-name>
          <NTd>
            <div class="my-table-details">1</div>
          </NTd>
        </template>
      </NTable>
    </div>
  </div>
  <pre>{{ columns }}</pre>
</template>

<style scoped>
.table-wrapper {
  padding: 1rem;
}
</style>
