<script setup lang="ts">
import { NScrollbar, type NScrollbarInstance } from '@ui/index'
import { inject, onMounted, ref } from 'vue'

import { SYNC_SCROLL_INJECTION_KEY } from './tokens'

const nScrollbarRef = ref<NScrollbarInstance>()

const scrollContext = inject(SYNC_SCROLL_INJECTION_KEY, undefined)

onMounted(() => {
  scrollContext!.addEl(nScrollbarRef.value!.wrapRef!)
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
