<script lang="ts" setup>
import { NButton, NDialog } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const outerVisible = ref(false)
const innerVisible = ref(false)
</script>

<template>
  <h2>Nested</h2>
  <div class="row">
    <NButton text @click="outerVisible = true"> open the outer Dialog </NButton>

    <NDialog v-model="outerVisible" title="Outer Dialog">
      <template #default>
        <NDialog v-model="innerVisible" width="30%" title="Inner Dialog" append-to-body />
      </template>
      <template #footer>
        <div class="dialog-footer">
          <NButton @click="outerVisible = false">Cancel</NButton>
          <NButton appearance="primary" @click="innerVisible = true"> open the inner Dialog </NButton>
        </div>
      </template>
    </NDialog>
  </div>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
