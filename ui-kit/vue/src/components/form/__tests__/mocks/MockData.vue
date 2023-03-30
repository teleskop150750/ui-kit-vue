<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { NButton } from '@ui/components/button'
import { ref, toRef } from 'vue'

import NForm from '../../src/form/form.vue'
import NFormItem from '../../src/form-item/form-item.vue'

const props = defineProps({
  onSuccess: Function,
  onError: Function,
  onSubmit: Function,
  model: Object,
})

const propsModel = toRef(props, 'model')
const model = ref({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
})

const formRef = ref<InstanceType<typeof NForm>>()

const removeDomain = (item: any) => {
  const index = model.value.domains.indexOf(item)

  if (index !== -1) {
    model.value.domains.splice(index, 1)
  }
}

const addDomain = () => {
  model.value.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = async () => {
  if (!formRef.value) {
    return
  }

  try {
    const validate = props.onSubmit ? formRef.value.validate(props.onSubmit as any) : formRef.value.validate()

    await validate
    props.onSuccess?.()
  } catch (error) {
    props.onError?.(error)
  }
}
</script>

<template>
  <NForm ref="formRef" :model="{ ...model, ...(propsModel || {}) }">
    <NFormItem
      v-for="(domain, index) in model.domains"
      :key="domain.key"
      class="domain-item"
      :label="`Domain${index}`"
      :prop="`domains.${index}.value`"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
    >
      <input v-model="domain.value" />
      <NButton
        :class="`delete-domain ${index}`"
        @click="
          (e) => {
            e.preventDefault()
            removeDomain(domain)
          }
        "
      >
        Delete
      </NButton>
    </NFormItem>
    <slot />
    <NFormItem>
      <NButton class="submit" appearance="primary" @click="submitForm"> Submit </NButton>
      <NButton class="add-domain" @click="addDomain"> New domain </NButton>
    </NFormItem>
  </NForm>
</template>
