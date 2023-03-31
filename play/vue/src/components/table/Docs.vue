<script setup lang="ts">
import { NTable, NTable2, type NTableColumn } from '@ui/index'
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
    <div>
      <NTable :columns="columns" :rows="rows">
        <!-- <template #body>
          <div>Body</div>
        </template> -->
      </NTable>
    </div>

    <hr />

    <div>
      <NTable2 :columns="columns" :rows="rows" />
    </div>
  </div>
</template>
