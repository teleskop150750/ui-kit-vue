<script setup lang="ts">
import { NTable, type NTableColumn, type NTableRequest, NTd } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const columns = ref<NTableColumn[]>([
  {
    field: 'id',
    label: 'id',
    name: 'id',
    isSortable: true,
    isResizable: true,
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
    width: 200,
  },
  {
    field: 'foo',
    label: 'foo',
    name: 'foo',
    isResizable: true,
    width: 200,
  },
  {
    field: 'bar',
    label: 'bar',
    name: 'bar',
    isResizable: true,
    width: 200,
  },
  {
    field: 'bar2',
    label: 'bar2',
    name: 'bar2',
    isResizable: true,
    width: 200,
  },
  {
    field: 'bar3',
    label: 'bar3',
    name: 'bar3',
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
  bar2: 'bar2',
  bar3: 'bar3',
}))

const page = ref(3)

function handleRequest(payload: NTableRequest) {
  console.log('handleRequest', payload)
}
</script>

<template>
  <div class="demo">
    <div>Page | {{ page }}</div>

    <hr />

    <div class="body">
      <NTable
        v-model:columns="columns"
        v-model:current-page="page"
        :rows="rows"
        query-type="number"
        @request="handleRequest"
      >
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
