<script lang="ts" setup>
import { NButton, NDialog, NForm, NFormItem, NInput, NOption, NSelect } from '@nado/ui-kit-vue'
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
</script>

<template>
  <h2>Content</h2>
  <div class="row">
    <NButton @click="dialogTableVisible = true"> open a Table nested Dialog </NButton>

    <NDialog v-model="dialogTableVisible" title="Shipping address">
      <p>HTML</p>
    </NDialog>

    <!-- Form -->
    <NButton @click="dialogFormVisible = true"> open a Form nested Dialog </NButton>

    <NDialog v-model="dialogFormVisible" title="Shipping address">
      <NForm :model="form">
        <NFormItem label="Promotion name" :label-width="formLabelWidth">
          <NInput v-model="form.name" autocomplete="off" />
        </NFormItem>
        <NFormItem label="Zones" :label-width="formLabelWidth">
          <NSelect v-model="form.region" placeholder="Please select a zone">
            <NOption label="Zone No.1" value="shanghai" />
            <NOption label="Zone No.2" value="beijing" />
          </NSelect>
        </NFormItem>
      </NForm>
      <template #footer>
        <span class="dialog-footer">
          <NButton @click="dialogFormVisible = false">Cancel</NButton>
          <NButton appearance="primary" @click="dialogFormVisible = false"> Confirm </NButton>
        </span>
      </template>
    </NDialog>
  </div>
</template>

<style scoped>
.d-button--text {
  margin-right: 15px;
}

.d-select {
  width: 300px;
}

.d-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
