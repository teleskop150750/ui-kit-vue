<script lang="ts" setup>
import { NPagination } from '@ui/index'
import { computed, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'

const router = useRoute()

const route2 = computed(() => {
  const instance = getCurrentInstance()

  if (!instance) {
    return undefined
  }

  const route_ = instance.proxy?.$route

  if (!route_) {
    return undefined
  }

  return route_
})
</script>

<template>
  <div class="example-pagination-block">
    <div>
      {{ router.fullPath }}
    </div>
    <div>
      {{ route2?.fullPath }}
    </div>

    <div class="example-demonstration">When you have few pages</div>
    <!-- <NPagination query-type="offset" :total="50" /> -->
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">When you have more than 7 pages</div>
    <NPagination query-type="offset" :page-count="100" />
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
