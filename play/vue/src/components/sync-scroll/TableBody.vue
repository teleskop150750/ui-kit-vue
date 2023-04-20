<script setup lang="ts">
import { NScrollbar, type NScrollbarInstance, SYNC_SCROLL_INJECTION_KEY } from '@nado/ui-kit-vue'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'

const nScrollbarRef = ref<NScrollbarInstance>()

const scrollContext = inject(SYNC_SCROLL_INJECTION_KEY, undefined)!

onMounted(() => {
  scrollContext!.addElement(nScrollbarRef.value!.wrapRef!)
})

onBeforeUnmount(() => {
  scrollContext.removeElement(nScrollbarRef.value!.wrapRef!)
})
</script>

<template>
  <NScrollbar ref="nScrollbarRef" class="body-wrap" always>
    <div class="body-inner">body-inner</div>
  </NScrollbar>
</template>

<style scoped>
.body-wrap {
  width: 500px;
  height: 500px;
}

.body-inner {
  width: 700px;
  height: 700px;

  background-color: hsl(208deg 100% 97%);
}
</style>
