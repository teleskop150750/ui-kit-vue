<script setup lang="ts">
import { type Measurable, NButton, NTooltip } from '@nado/ui-kit-vue'
import { onMounted, ref } from 'vue'

const virtual = ref(false)
const position = ref({
  height: 0,
  width: 0,
  x: 0,
  y: 0,
})

const triggerRef = ref<Measurable>({
  getBoundingClientRect() {
    return position.value
  },
})

onMounted(() => {
  document.addEventListener('mousemove', (e) => {
    position.value = DOMRect.fromRect({
      width: 0,
      height: 0,
      x: e.clientX,
      y: e.clientY,
    })
  })
})
</script>

<template>
  <div class="tooltip-base-box-m">
    <h2>Virtual triggering</h2>
    <NTooltip
      v-model:visible="virtual"
      content="Bottom center"
      placement="bottom"
      effect="light"
      trigger="click"
      is-virtual-triggering
      :virtual-ref="triggerRef"
    />
    <NButton @click="virtual = !virtual">test</NButton>
  </div>
</template>

<style scoped>
.tooltip-base-box-m {
  padding: 0 80px;
}

.tooltip-base-box-m .n-button {
  margin: 8px;
}
</style>
