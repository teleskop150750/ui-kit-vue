<script setup lang="ts">
import { NVirtualList } from '@nado/ui-kit-vue'

const fixVerticalData = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`)
</script>

<template>
  <div>
    <h3 class="n-title-3">Fixed size</h3>
    <div class="row">
      <NVirtualList
        :scrollbar-always-on="true"
        :cache="3"
        :height="400"
        :width="400"
        :item-size="50"
        :data="fixVerticalData"
        class="window"
      >
        <template #default="{ index, style }">
          <div class="scrollbar-demo-item" :class="[index % 2 === 0 && 'scrollbar-demo-item--white']" :style="style">
            Item {{ index }}
          </div>
        </template>
      </NVirtualList>
    </div>
  </div>
</template>

<style scoped>
.window {
  box-shadow: 0 0 0 2px rgb(17 17 17);
}

.scrollbar-demo-item {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;

  color: var(--n-sys-color-primary-600);
  text-align: center;

  background: var(--n-sys-color-primary-100);
}

.scrollbar-demo-item--white {
  background: var(--n-ref-palette-white);
}

.scrollbar-flex-content {
  display: flex;
}

.scrollbar-flex-demo-item {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 50px;
  margin: 10px;

  color: var(--n-sys-color-primary-600);
  text-align: center;

  border-radius: 4px;

  background: var(--n-sys-color-primary-100);
}
</style>
