<script lang="ts" setup>
import { NScrollbar } from '@ui/index'
</script>

<template>
  <NScrollbar>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </NScrollbar>
</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 50px;
  margin: 10px;

  color: var(--n-sys-color-danger);
  text-align: center;

  border-radius: 4px;

  background: var(--n-sys-color-danger-100);
}
</style>
