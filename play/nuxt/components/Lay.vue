<script setup lang="ts">
const instance = getCurrentInstance()!

watch(
  () => ({
    ...instance.proxy!.$route,
  }),
  () => {
    console.log('222')
  },
)
</script>

<template>
  <header>
    <pre>{{ instance.appContext.config.globalProperties.$route }}</pre>
    <p>Lay</p>
  </header>
</template>
