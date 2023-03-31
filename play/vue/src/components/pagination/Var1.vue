<script lang="ts" setup>
import { NPagination } from '@nado/ui-kit-vue'
import { useRoute } from 'vue-router'

const router = useRoute()
</script>

<template>
  <div class="example-pagination-block">
    <div>
      {{ router.fullPath }}
    </div>

    <div class="example-demonstration">When you have few pages</div>
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">[Button] page-count</div>
    <NPagination :page-count="100" />
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">[number] page-count</div>
    <NPagination query-type="number" :page-count="100" />
  </div>

  <div class="example-pagination-block">
    <div class="example-demonstration">[total] page-count</div>
    <NPagination query-type="number" :total="1000" />
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
