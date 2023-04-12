<script setup lang="ts">
import { getCurrentInstance, watch } from '#imports'

const instance = getCurrentInstance()!

// console.log(instance.appContext.config.globalProperties.$route);

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
  <Html class="nado-theme n-page" lang="ru">
    <Body class="n-page__body">
      <NuxtPage />
    </Body>
  </Html>
</template>
