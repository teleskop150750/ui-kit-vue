<script lang="ts" setup>
import { NButton, NDialog } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>

<template>
  <h2>Draggable</h2>
  <div class="row">
    <NButton @click="dialogVisible = true"> Click to open Dialog </NButton>

    <NDialog v-model="dialogVisible" title="Tips" width="30%" draggable>
      <span>It's a draggable Dialog</span>
      <template #footer>
        <span class="dialog-footer">
          <NButton @click="dialogVisible = false">Cancel</NButton>
          <NButton appearance="primary" @click="dialogVisible = false"> Confirm </NButton>
        </span>
      </template>
    </NDialog>
  </div>
</template>
