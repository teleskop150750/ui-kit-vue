<script setup lang="ts">
import { type NTableColumn, NTableV2, NTd } from '@ui/index'
import { ref } from 'vue'

const isBody = ref(false)

const columns: NTableColumn[] = [
  {
    field: 'id',
    label: 'id',
    name: 'id',
  },
  {
    field: 'name',
    label: 'name',
    name: 'name',
  },
]

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
      <NTableV2 :columns="columns" :rows="rows">
        <template #body-cell-name>
          <NTd>
            <div class="my-table-details">1</div>
          </NTd>
        </template>
      </NTableV2>
    </div>
  </div>
</template>
