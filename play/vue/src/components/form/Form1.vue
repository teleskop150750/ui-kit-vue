<script setup lang="ts">
import { NButton, NForm, type NFormInstance, NFormItem, type NFormRules, NInput } from '@nado/ui-kit-vue'
import { reactive, ref } from 'vue'
import * as Yup from 'yup'

const formRef = ref<NFormInstance>()
const formModel = reactive({ name: 'Name', desc: 'Description' })

const rules = reactive<NFormRules>({
  name: [{ rule: Yup.string().required(), trigger: 'blur' }],
  desc: [
    { rule: Yup.string().length(2), trigger: 'blur' },
    // { rule: Yup.string().min(3).max(5), trigger: 'blur' },
    // { rule: Yup.string().min(2).max(5), trigger: 'blur' },
  ],
})

const submitForm = async (formEl: NFormInstance | undefined) => {
  if (!formEl) {
    return
  }

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
      <NFormItem label="Name" prop="name" :max-errors="2" hint="Введите имя">
        <NInput v-model="formModel.name" />
      </NFormItem>
      <NFormItem label="Description" prop="desc">
        <NInput v-model="formModel.desc" />
      </NFormItem>
      <NButton @click="resetForm(formRef)">Reset</NButton>
      <NButton @click="submitForm(formRef)">Submit</NButton>
    </NForm>
  </div>
</template>
