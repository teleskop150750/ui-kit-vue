<script lang="ts" setup>
import { NButton, NDialog } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const centerDialogVisible = ref(false)
</script>

<template>
  <h2>Center</h2>
  <div class="row">
    <NButton @click="centerDialogVisible = true"> Click to open the Dialog </NButton>

    <NDialog v-model="centerDialogVisible" title="Warning" width="30%" align-center>
      <span>Open the dialog from the center from the screen</span>
      <template #footer>
        <span class="dialog-footer">
          <NButton @click="centerDialogVisible = false">Cancel</NButton>
          <NButton appearance="primary" @click="centerDialogVisible = false"> Confirm </NButton>
        </span>
      </template>
    </NDialog>
  </div>
</template>
