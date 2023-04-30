<script setup lang="ts">
import { NSyncScroll, type NSyncScrollInstance } from '@nado/ui-kit-vue'
import { onMounted, ref } from 'vue'

import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import TableHeader from './TableHeader.vue'

const syncScrollRef = ref<NSyncScrollInstance>()!
const bar1 = ref<HTMLElement>()!
const bar2 = ref<HTMLElement>()!

const isOpen = ref(false)

function onClick() {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  console.log(syncScrollRef.value)
  console.log(bar1.value)

  syncScrollRef.value!.addElement([bar1.value!, bar2.value!])
})
</script>

<template>
  <div class="demo">
    <div class="row">
      <div ref="bar1" class="bar1">
        <div class="bar1__inner"></div>
      </div>
    </div>
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

    <button type="button" @click="onClick">Is Open {{ isOpen }}</button>
    <div class="table">
      <NSyncScroll>
        <TableHeader />
        <TableFooter v-if="isOpen" />
        <TableBody />
      </NSyncScroll>
    </div>
  </div>
</template>

<style scoped>
.bar1 {
  width: 400px;
  height: 120px;

  overflow: auto;
}

.bar1__inner {
  width: 1700px;
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
