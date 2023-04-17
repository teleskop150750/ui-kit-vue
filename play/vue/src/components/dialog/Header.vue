<script lang="ts" setup>
import { NIconCircleCloseFilled } from '@nado/ui-kit-icons-vue'
import { NButton, NDialog, NIcon } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <h2>Header</h2>
  <div class="row">
    <NButton @click="visible = true"> Open Dialog with customized header </NButton>
    <NDialog v-model="visible" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
          <NButton appearance="danger" @click="close">
            <NIcon class="n-icon--left"><NIconCircleCloseFilled /></NIcon>
            Close
          </NButton>
        </div>
      </template>
      This is dialog content.
    </NDialog>
  </div>
</template>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
