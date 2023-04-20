<script setup lang="ts">
import { NSyncScroll, type NSyncScrollInstance } from '@nado/ui-kit-vue'
import { onMounted, ref } from 'vue'

import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import TableHeader from './TableHeader.vue'

const syncScrollRef = ref<NSyncScrollInstance>()!
const bar1 = ref<HTMLElement>()!
const bar2 = ref<HTMLElement>()!

onMounted(() => {
  syncScrollRef.value!.addEl(bar1.value!)
  syncScrollRef.value!.addEl(bar2.value!)
})
</script>

<template>
  <div class="demo">
    <div class="foo">
      <NSyncScroll ref="syncScrollRef">
        <div ref="bar1" class="bar1">
          <div class="bar1__inner"></div>
        </div>
        <div ref="bar2" class="bar1">
          <div class="bar1__inner"></div>
        </div>
      </NSyncScroll>
    </div>

    <div class="table">
      <NSyncScroll>
        <TableHeader />
        <TableFooter />
        <TableBody />
      </NSyncScroll>
    </div>
  </div>
</template>

<style scoped>
.bar1 {
  width: 200px;
  height: 120px;

  overflow: auto;
}

.bar1__inner {
  width: 700px;
  height: 100px;

  background-image: repeating-linear-gradient(
    -45deg,
    rgb(0 0 0 / 20%),
    rgb(0 0 0 / 20%) 5px,
    transparent 5px,
    transparent 15px
  );
}
</style>
