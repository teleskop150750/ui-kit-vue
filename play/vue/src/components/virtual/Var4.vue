<script setup lang="ts">
import { NVirtualList } from '@ui/index'

const dynamicVerticalItems = Array.from({ length: 100_000 }).map((_, i) => ({
  size: i % 2 === 0 ? 50 : 100,
}))

function getSize(idx: number) {
  return dynamicVerticalItems[idx].size
}
</script>

<template>
  <div>
    <h3 class="n-title-3">Horizontal</h3>
    <div class="row">
      <NVirtualList
        :cache="3"
        :estimated-item-size="75"
        layout="horizontal"
        :height="400"
        :width="400"
        :item-size="getSize"
        :data="dynamicVerticalItems"
        class="window"
      >
        <template #default="{ index, style }">
          <div class="scrollbar-demo-item" :class="[index % 2 === 0 && 'scrollbar-demo-item--white']" :style="style">
            {{ index }}
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
