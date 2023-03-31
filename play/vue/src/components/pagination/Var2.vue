<script lang="ts" setup>
import { NPagination } from '@nado/ui-kit-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const router = useRoute()

const pageSize = ref(10)
const pageCount = ref(100)
const total = ref(100)
</script>

<template>
  <div class="example-pagination-block">
    <div>
      {{ router.fullPath }}
    </div>
  </div>
  <div class="example-pagination-block">
    <div>
      <div>PageCount: {{ pageCount }}</div>
      <div><input v-model.number="pageCount" type="text" /></div>
    </div>
    <div>
      <NPagination :page-count="pageCount" />
    </div>
  </div>

  <div class="example-pagination-block">
    <div>
      <div>PerPage _ total: {{ pageSize }} | {{ total }}</div>
      <div><input v-model.number="total" type="text" /></div>
      <div>
        <select v-model.number="pageSize">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
    <div>
      <NPagination query-type="number" :total="total" :page-size="pageSize" />
    </div>
  </div>
</template>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
