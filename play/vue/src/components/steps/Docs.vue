<script lang="ts" setup>
import { NButton, NStep, NSteps } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const active = ref(0)

const next = () => {
  // eslint-disable-next-line no-plusplus
  if (active.value++ > 2) {
    active.value = 0
  }
}
</script>

<template>
  <NSteps :active="active" finish-status="success">
    <NStep title="Step 1" />
    <NStep title="Step 2" />
    <NStep title="Step 3" />
  </NSteps>

  <NButton style="margin-top: 12px" @click="next">Next step</NButton>
</template>
