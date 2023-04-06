<script setup lang="ts">
import { NSyncScroll } from '@nado/ui-kit-vue'
import { onMounted } from 'vue'

import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import TableHeader from './TableHeader.vue'

onMounted(() => {})
</script>

<template>
  <div class="demo">
    <div class="table">
      <NSyncScroll>
        <TableHeader />
        <TableFooter />
        <TableBody />
      </NSyncScroll>
    </div>
  </div>
</template>
