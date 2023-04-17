<script lang="ts" setup>
import { NButton, NDialog } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const centerDialogVisible = ref(false)
</script>

<template>
  <h2>Centered</h2>
  <div class="row">
    <NButton @click="centerDialogVisible = true"> Click to open the Dialog </NButton>

    <NDialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span> It should be noted that the content will not be aligned in center by default </span>
      <template #footer>
        <span class="dialog-footer">
          <NButton @click="centerDialogVisible = false">Cancel</NButton>
          <NButton appearance="primary" @click="centerDialogVisible = false"> Confirm </NButton>
        </span>
      </template>
    </NDialog>
  </div>
</template>
