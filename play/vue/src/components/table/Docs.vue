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
  },
  {
    field: 'name',
    label: 'name',
    name: 'name',
    sortable: true,
  },
])

const rows = [
  {
    id: 1,
    name: 'name 1',
  },
  {
    id: 2,
    name: 'name 2',
  },
]
</script>

<template>
  <div class="demo">
    <button type="button" @click="isBody = !isBody">button</button>

    <hr />

    <div>
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
