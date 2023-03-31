<script setup lang="ts">
import { NButton, NForm, type NFormInstance, NFormItem, type NFormRules, NInput } from '@nado/ui-kit-vue'
import { reactive, ref } from 'vue'

const formRef = ref<NFormInstance>()
const formModel = reactive({ text: 'text', desc: 'desc' })

const rules = reactive<NFormRules>({
  text: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    { min: 2, max: 5, message: 'Length should be 2', trigger: 'blur' },
  ],
  desc: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    { min: 2, max: 5, message: 'Length should be 2', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: NFormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: NFormInstance | undefined) => {
  if (!formEl) {
    return
  }

  formEl.resetFields()
}
</script>

<template>
  <div class="row">
    <NForm ref="formRef" :model="formModel" :rules="rules">
      <NFormItem label="Label" prop="text" :max-errors="2" hint="Введите email">
        <NInput v-model="formModel.text" />
      </NFormItem>
      <NFormItem label="Label" prop="desc">
        <NInput v-model="formModel.desc" />
      </NFormItem>
      <NButton @click="resetForm(formRef)">Reset</NButton>
      <NButton @click="submitForm(formRef)">Submit</NButton>
    </NForm>
  </div>
</template>
