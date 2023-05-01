<script setup lang="ts">
import { isClient } from '@nado/ui-kit-utils'
import { computed } from 'vue'

import { portalProps } from './NPortal.model'

const props = defineProps(portalProps)

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
