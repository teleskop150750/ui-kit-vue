<script setup lang="ts">
import { SYNC_SCROLL_INJECTION_KEY } from '@ui/index'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'

const headerRef = ref<HTMLElement>()

const scrollContext = inject(SYNC_SCROLL_INJECTION_KEY, undefined)!

onMounted(() => {
  scrollContext.addEl(headerRef.value!)
})

onBeforeUnmount(() => {
  scrollContext.removeEl(headerRef.value!)
})
</script>

<template>
  <div ref="headerRef" class="header-wrap">
    <div class="header">
      <div v-for="n in 30" :key="n" class="header-inner">b</div>
    </div>
  </div>
</template>

<style scoped>
.header-wrap {
  width: 500px;
  height: 100px;

  overflow: auto;
}

.header {
  display: flex;
}

.header-wrap::-webkit-scrollbar {
  display: none;
}

.header-inner {
  flex-shrink: 0;

  width: 100px;
  height: 100px;

  border: 1px solid black;
}
</style>
