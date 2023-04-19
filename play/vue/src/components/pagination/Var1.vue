<script lang="ts" setup>
import { NPagination } from '@nado/ui-kit-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const page = ref(10)
const queryPage = ref(10)
const router = useRoute()
</script>

<template>
  <div class="example-pagination-block">
    <div>
      {{ router.fullPath }}
    </div>

    <div class="example-demonstration">When you have few pages</div>
  </div>
  <h2>Button + count</h2>
  <div class="example-pagination-block">
    <div class="example-demonstration">[Button] page-count</div>
    <div class="example-demonstration">[Button] current-count | {{ page }}</div>
    <NPagination v-model:current-page="page" :page-count="100" />
  </div>
  <h2>Link + count + v-model:current-page</h2>
  <div class="example-pagination-block">
    <div class="example-demonstration">[number] page-count</div>
    <NPagination v-model:current-page="queryPage" query-type="number" :page-count="100" />
  </div>

  <h2>Link + total</h2>
  <div class="example-pagination-block">
    <div class="example-demonstration">[total] page-count</div>
    <NPagination query-type="number" query-page-number="page_2[number]" query-page-size="page_2[size]" :total="1000" />
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
