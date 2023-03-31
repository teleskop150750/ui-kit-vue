<script setup lang="ts">
import { onMounted } from 'vue'

import SyncScrollPanel from './sync-scroll-panel.vue'
import TableFooter from './TableFooter.vue'
import TableHeader from './TableHeader.vue'
// import TableBody from './TableBody.vue'

onMounted(() => {})
</script>

<template>
  <div class="demo">
    <div class="table">
      <SyncScrollPanel>
        <TableHeader />
        <TableFooter />
        <!-- <TableBody /> -->
      </SyncScrollPanel>
    </div>
  </div>
</template>
