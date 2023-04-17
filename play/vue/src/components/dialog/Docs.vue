<script lang="ts" setup>
import { NButton, NDialog } from '@nado/ui-kit-vue'
import { ref } from 'vue'

import Center from './Center.vue'
import Centered from './Centered.vue'
import Content from './Content.vue'
import Destroy from './Destroy.vue'
import Draggable from './Draggable.vue'
import Header from './Header.vue'
import Nested from './Nested.vue'

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  done()
}
</script>

<template>
  <h1>Dialog</h1>
  <h2>Base</h2>
  <div class="row">
    <NButton text @click="dialogVisible = true"> click to open the Dialog </NButton>

    <NDialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
      :modal="false"
      close-on-click-modal
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <NButton @click="dialogVisible = false">Cancel</NButton>
          <NButton appearance="primary" @click="dialogVisible = false"> OK </NButton>
        </span>
      </template>
    </NDialog>
  </div>

  <Content />
  <Header />
  <Nested />
  <Centered />
  <Center />
  <Destroy />
  <Draggable />
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
