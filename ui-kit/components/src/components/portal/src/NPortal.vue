<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { computed } from 'vue'

import { nPortalProps } from './portal.model'

const props = defineProps(nPortalProps)

const inline = computed(() => props.disabled || props.to === 'self')
</script>

<template>
  <template v-if="inline">
    <slot />
  </template>

  <template v-else-if="isClient">
    <Teleport :to="to">
      <slot />
    </Teleport>
  </template>
</template>
