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
  <div>
    <div>
      <!-- <Lay /> -->
      <!-- <pre>{{ instance.appContext.config.globalProperties.$route }}</pre> -->
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
