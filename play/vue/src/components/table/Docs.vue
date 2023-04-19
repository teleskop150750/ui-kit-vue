<script setup lang="ts">
import { NTable, type NTableColumn, NTd } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const isBody = ref(false)

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
    width: 200,
  },
])

const rows = Array.from({ length: 100 }).map((id) => ({
  id,
  name: 'name',
  age: 20,
  foo: 'foo',
  bar: 'bar',
}))
</script>

<template>
  <div class="demo">
    <button type="button" @click="isBody = !isBody">button</button>

    <hr />

    <div class="body">
      <NTable v-model:columns="columns" :rows="rows">
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
