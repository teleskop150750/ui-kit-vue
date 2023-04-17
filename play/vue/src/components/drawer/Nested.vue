<script lang="ts" setup>
import { NButton, NDrawer } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const drawer = ref(false)
const innerDrawer = ref(false)

const handleClose = (done: () => void) => {
  done()
}
</script>

<template>
  <h2>Nested</h2>
  <div class="row">
    <NButton appearance="primary" style="margin-left: 16px" @click="drawer = true"> open </NButton>

    <NDrawer v-model="drawer" title="I'm outer Drawer" size="50%">
      <div>
        <NButton @click="innerDrawer = true">Click me!</NButton>
        <NDrawer v-model="innerDrawer" title="I'm inner Drawer" :append-to-body="true" :before-close="handleClose">
          <p>_(:зゝ∠)_</p>
        </NDrawer>
      </div>
    </NDrawer>
  </div>
</template>
