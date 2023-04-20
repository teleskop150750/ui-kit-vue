<script setup lang="ts">
import { SYNC_SCROLL_INJECTION_KEY } from '@nado/ui-kit-vue'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'

const footerRef = ref<HTMLElement>()

const scrollContext = inject(SYNC_SCROLL_INJECTION_KEY, undefined)!

onMounted(() => {
  scrollContext.addElement(footerRef.value!)
})

onBeforeUnmount(() => {
  scrollContext.removeElement(footerRef.value!)
})
</script>

<template>
  <div ref="footerRef" class="footer-wrap">
    <div class="footer">
      <div v-for="n in 30" :key="n" class="footer-inner">b</div>
    </div>
  </div>
</template>

<style scoped>
.footer-wrap {
  width: 500px;
  height: 100px;

  overflow: auto;
}

.footer {
  display: flex;
}

.footer-wrap::-webkit-scrollbar {
  display: none;
}

.footer-inner {
  flex-shrink: 0;

  width: 100px;
  height: 100px;

  border: 1px solid black;
}
</style>
