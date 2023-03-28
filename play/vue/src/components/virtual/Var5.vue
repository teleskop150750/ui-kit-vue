<script setup lang="ts">
import { NVirtualList } from '@ui/index'
import { onMounted, ref } from 'vue'

const dynamicVerticalItems = Array.from({ length: 100_000 }).map((_, i) => ({
  size: i % 2 === 0 ? 50 : 100,
}))

function getSize(idx: number) {
  return dynamicVerticalItems[idx].size
}

// Foo
const fooVertical = ref()

const fooVerticalItem = ref(0)

const fooVerticalMax = ref(0)
const fooVerticalRange = ref(0)
const fooVerticalOffset = ref(0)

onMounted(() => {
  fooVerticalOffset.value = fooVertical.value.states.scrollOffset
  fooVerticalMax.value = fooVertical.value.innerRef.clientHeight - 400
})
const fixVerticalMaxSlider = (event: Event) => {
  fooVertical.value.scrollTo(Number((event.target as HTMLInputElement).value))
}

function fixVerticalJump() {
  fooVertical.value.scrollToItem(fooVerticalItem.value, 'auto')
}

function handleScroll(_: unknown, scrollOffset: number) {
  fooVerticalRange.value = scrollOffset
}
</script>

<template>
  <div>
    <h3 class="n-title-3">Foo</h3>
    <div>
      <div>
        <input v-model.number="fooVerticalItem" type="number" />
        <button type="button" @click="fixVerticalJump">Go</button>
      </div>

      <div class="row">
        <NVirtualList
          ref="fooVertical"
          :scrollbar-always-on="true"
          :cache="3"
          :height="400"
          :width="400"
          :item-size="getSize"
          :data="dynamicVerticalItems"
          class="window"
          @scroll="handleScroll"
        >
          <template #default="{ index, style }">
            <div class="scrollbar-demo-item" :class="[index % 2 === 0 && 'scrollbar-demo-item--white']" :style="style">
              Item {{ index }}
            </div>
          </template>
        </NVirtualList>
      </div>
      <div>
        <input :value="fooVerticalRange" type="range" min="0" :max="fooVerticalMax" @input="fixVerticalMaxSlider" />
        <span>{{ fooVerticalMax }}</span> / <span>{{ fooVerticalRange }}</span>
      </div>
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
