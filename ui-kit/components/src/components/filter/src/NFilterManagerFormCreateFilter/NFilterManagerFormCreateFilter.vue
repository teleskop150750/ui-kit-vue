<script setup lang="ts">
// import { useNamespace } from '@nado/ui-kit-hooks'
// import { reactive, ref } from 'vue'

// import { NForm, type NFormInstance } from '../../../form'
// import { NFormItem } from '../../../form-item'
// import {
//   // nFilterManagerFormCreateFilterEmits,
//   nFilterManagerFormCreateFilterProps,
// } from './filter-manager-form-create-filter.model'

// const props = defineProps(nFilterManagerFormCreateFilterProps)
// // const emit = defineEmits(nFilterManagerFormCreateFilterEmits)
// const ns = useNamespace('form-filter')
// // const nsForm = useNamespace('form')
// const formRef = ref<NFormInstance>()
// const formModel = reactive({ filterName: 'Name', desc: 'Description' })

// // const foo = props.fields

// // const submitForm = async (formEl: NFormInstance | undefined) => {
// //   if (!formEl) {
// //     return
// //   }

// //   await formEl.validate((valid, fields) => {
// //     if (valid) {
// //       console.log('submit!')
// //     } else {
// //       console.log('error submit!', fields)
// //     }
// //   })
// // }

// // const resetForm = (formEl: NFormInstance | undefined) => {
// //   if (!formEl) {
// //     return
// //   }

// //   formEl.resetFields()
// // }
</script>

<script lang="ts">
export default {
  name: 'NFilterManagerFormCreateFilterItem',
}
</script>

<template>
  <div>
    <!-- <NForm ref="formRef" :class="ns.b()" :model="formModel"> -->
    <!-- <div :class="ns.e('header')">
        <NFormItem label="Название фильтра" prop="filterName">
          <NInput v-model="formModel.name" />
        </NFormItem>
      </div> -->

    <!-- <div v-for="bar in foo" :key="bar."></div> -->

    <!-- <div :class="ns.e('body')">
      <NFilterManagerFormCreateFilterField />
    </div> -->
    <!-- </NForm> -->
  </div>
</template>

<style>
.n-form-filter__header {
  margin-bottom: 16px;
}

.n-form-filter__body {
  display: grid;
  gap: 16px;
}
</style>
