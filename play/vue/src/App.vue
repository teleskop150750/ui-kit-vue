<script setup lang="ts">
import { NButton } from '@ui'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <NButton to="/about">About</NButton>

  <!-- <RouterView /> -->
</template>

<style>
.docs-card {
  --surface-card: hsl(0deg 0% 100%);

  margin-bottom: 2rem;
  padding: 2rem;
  box-sizing: border-box;

  color: var(--text-color);
  font-weight: 400;
  font-size: 14px;

  border-radius: 10px;

  background-color: var(--surface-card);
  color-scheme: light;
  -webkit-font-smoothing: antialiased;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.row + .row {
  margin-top: 1rem;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
