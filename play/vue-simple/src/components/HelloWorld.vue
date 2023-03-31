<script setup lang="ts">
import type { NTableColumn } from '@ui/index'
import { computed } from 'vue'

const cols: NTableColumn[] = [
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

const getRowKey = computed(() => (row: any) => row.id)
</script>

<template>
  <div>
    <h1>Hello</h1>
    <div>
      <template v-for="row in rows" :key="getRowKey(row)">
        <template v-for="col in cols" :key="col.field">
          <div>1</div>
        </template>
      </template>
    </div>
  </div>
</template>
