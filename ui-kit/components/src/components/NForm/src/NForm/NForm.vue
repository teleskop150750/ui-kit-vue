<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { type Arrayable, debugWarn, isFunction } from '@nado/ui-kit-utils'
import { computed, provide, reactive, toRefs, watch } from 'vue'

import type { FieldsValidationError, FormValidationError } from '../errors'
import { useFormSize } from '../hooks'
import type { NFormItemProp } from '../NFormItem/NFormItem.model'
import type { NFormItemContext } from '../NFormItem/tokens'
import type { NFormValidateCallback, NFormValidationResult } from '../types'
import { filterFields } from '../utils'
import { useFormItemList } from './hooks'
import { formEmits, formProps } from './NForm.model'
import { FORM_CONTEXT_INJECTION_KEY, type NFormContext } from './tokens'

const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const COMPONENT_NAME = 'NForm'

const fields: NFormItemContext[] = []

const formSize = useFormSize()
const ns = useNamespace('form')
const formClasses = computed(() => [ns.b(), ns.type('size', formSize.value || 'default')])

const isValidatable = computed(() => {
  const hasModel = !!props.model

  if (!hasModel) {
    debugWarn(COMPONENT_NAME, 'model is required for validate to work.')
  }

  return hasModel
})

const { addField, removeField, findValidateFields } = useFormItemList(fields)

async function validate(callback?: NFormValidateCallback): NFormValidationResult {
  return validateField(undefined, callback)
}

const validateField: NFormContext['validateField'] = async (modelProps = [], callback = undefined) => {
  const shouldThrow = !isFunction(callback)

  try {
    const result = await doValidateField(modelProps)

    // When result is false meaning that the fields are not validatable
    if (result === true) {
      callback?.(result)
    }

    return result
  } catch (error) {
    const invalidFields = error as FieldsValidationError

    if (props.scrollToError) {
      const first = Object.keys(invalidFields)[0]

      first && scrollToField(first)
    }

    callback?.(false, invalidFields)

    if (shouldThrow) {
      throw invalidFields
    }

    return false
  }
}

async function doValidateField(fieldNames: Arrayable<NFormItemProp> = []): Promise<boolean> {
  if (!isValidatable.value) {
    return false
  }

  const formItems = findValidateFields(fieldNames)

  if (formItems.length === 0) {
    return true
  }

  let validationErrors: FormValidationError = {} as FormValidationError

  const promises: NFormValidationResult[] = formItems.map((el) => el.validate(''))

  // eslint-disable-next-line promise/always-return
  await Promise.allSettled(promises).then((results) => {
    results.forEach((el) => {
      if (el.status === 'rejected') {
        validationErrors = {
          ...validationErrors,
          ...(el.reason as FormValidationError),
        }
      }
    })
  })

  if (Object.keys(validationErrors).length === 0) {
    return true
  }

  throw validationErrors
}

const resetFields: NFormContext['resetFields'] = (fieldNames = []) => {
  if (!props.model) {
    debugWarn(COMPONENT_NAME, 'model is required for resetFields to work.')

    return
  }

  filterFields(fields, fieldNames).forEach((field) => field.resetField())
}

const clearValidate: NFormContext['clearValidate'] = (fieldNames = []) => {
  filterFields(fields, fieldNames).forEach((field) => field.clearValidate())
}

function scrollToField(prop: NFormItemProp) {
  const field = filterFields(fields, prop)[0]

  if (field) {
    field.$el?.scrollIntoView()
  }
}

watch(
  () => props.rules,
  () => {
    if (props.validateOnRuleChange) {
      validate().catch((error) => debugWarn(error))
    }
  },
  { deep: true },
)

provide(
  FORM_CONTEXT_INJECTION_KEY,
  reactive({
    ...toRefs(props),
    emit,

    resetFields,
    clearValidate,
    validateField,
    addField,
    removeField,
  }),
)

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
  scrollToField,
})
</script>

<script lang="ts">
export default {
  name: 'NForm',
}
</script>

<template>
  <form :class="formClasses">
    <slot />
  </form>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-form/index.css');
</style>
