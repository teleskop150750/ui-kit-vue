<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { type Router, RouterLink } from 'vue-router'

const instance = getCurrentInstance()!
const router = instance.appContext.config.globalProperties.$router as Router
const routes = router
  .getRoutes()
  .map((el) => el)
  .filter((el) => el !== undefined)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="nav">
        <RouterLink v-for="r in routes" :key="r.path" :to="r">{{ r.name }}</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
.nav {
  display: flex;
  gap: 1rem;
}

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
