<script lang="ts" setup>
import type { ValidateFieldsError } from '@nado/async-validator'
import { useNamespace } from '@nado/ui-kit-hooks'
import { type Arrayable, debugWarn, isFunction } from '@nado/ui-kit-utils'
import { computed, provide, reactive, toRefs, watch } from 'vue'

import type { NFormItemProp } from '../../form-item'
import { nFormEmits, nFormProps } from './form.model'
import { useFormItemList } from './hooks'
import { useFormSize } from './shared'
import { FORM_CONTEXT_INJECTION_KEY, type NFormContext, type NFormItemContext } from './tokens'
import type { NFormValidateCallback, NFormValidationResult } from './types'
import { filterFields } from './utils'

const props = defineProps(nFormProps)
const emit = defineEmits(nFormEmits)
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
    if (error instanceof Error) {
      throw error
    }

    const invalidFields = error as ValidateFieldsError

    if (props.scrollToError) {
      const first = Object.keys(invalidFields)[0]

      first && scrollToField(first)
    }

    callback?.(false, invalidFields)

    return shouldThrow && Promise.reject(invalidFields)
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

  let validationErrors: ValidateFieldsError = {}

  const promises: NFormValidationResult[] = formItems.map((el) => el.validate(''))

  // eslint-disable-next-line promise/always-return
  await Promise.allSettled(promises).then((results) => {
    results.forEach((el) => {
      if (el.status === 'rejected') {
        validationErrors = {
          ...validationErrors,
          ...(el.reason as ValidateFieldsError),
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
