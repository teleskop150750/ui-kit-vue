<script setup lang="ts">
import { NButton, NDialog } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const centerDialogVisible = ref(false)
</script>

<template>
  <h2>Destroy</h2>
  <div class="row">
    <NButton @click="centerDialogVisible = true"> Click to open Dialog </NButton>

    <NDialog v-model="centerDialogVisible" title="Notice" width="30%" destroy-on-close center>
      <span>
        Notice: before dialog gets opened for the first time this node and the one bellow will not be rendered
      </span>
      <div>
        <strong>Extra content (Not rendered)</strong>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <NButton @click="centerDialogVisible = false">Cancel</NButton>
          <NButton appearance="primary" @click="centerDialogVisible = false"> Confirm </NButton>
        </span>
      </template>
    </NDialog>
  </div>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
