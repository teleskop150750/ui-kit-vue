<script lang="ts" setup>
import { NScrollbar } from '@ui/index'
</script>

<template>
  <NScrollbar height="400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </NScrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  margin: 10px;

  color: var(--n-sys-color-primary);
  text-align: center;

  border-radius: 4px;

  background: var(--n-sys-color-primary-100);
}
</style>
