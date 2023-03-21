<script lang="ts" setup>
import type { ValidateFieldsError } from '@nado/async-validator'
import { useNamespace } from '@ui/hooks'
import { debugWarn, isFunction } from '@ui/utils'
import type { Arrayable } from '@vueuse/core'
import { computed, provide, reactive, toRefs, watch } from 'vue'

import type { NFormItemProp } from '../form-item/form-item.model'
import { useFormSize } from '../shared'
import { FORM_CONTEXT_INJECTION_KEY, type NFormContext, type NFormItemContext } from '../tokens'
import { nFormEmits, nFormProps } from './form.model'
import { useFormItemList } from './hooks'
import type { NFormValidateCallback, NFormValidationResult } from './types'
import { filterFields } from './utils'

const props = defineProps(nFormProps)
const emit = defineEmits(nFormEmits)
const COMPONENT_NAME = 'NForm'

const fields: NFormItemContext[] = []

const formSize = useFormSize()
const ns = useNamespace('form')
const formClasses = computed(() => {
  const { inline } = props

  return [
    ns.b(),
    // todo: in v2.2.0, we can remove default
    // in fact, remove it doesn't affect the final style
    ns.m(formSize.value || 'default'),
    {
      [ns.m('inline')]: inline,
    },
  ]
})

const isValidatable = computed(() => {
  const hasModel = !!props.model

  if (!hasModel) {
    debugWarn(COMPONENT_NAME, 'model is required for validate to work.')
  }

  return hasModel
})

const { addField, removeField, obtainValidateFields } = useFormItemList(fields)

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

async function validate(callback?: NFormValidateCallback): NFormValidationResult {
  return validateField(undefined, callback)
}

async function doValidateField(props_: Arrayable<NFormItemProp> = []): Promise<boolean> {
  if (!isValidatable.value) {
    return false
  }

  const finedFields = obtainValidateFields(props_)

  if (finedFields.length === 0) {
    return true
  }

  let validationErrors: ValidateFieldsError = {}

  for (const field of finedFields) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await field.validate('')
    } catch (error) {
      validationErrors = {
        ...validationErrors,
        ...(error as ValidateFieldsError),
      }
    }
  }

  if (Object.keys(validationErrors).length === 0) {
    return true
  }

  throw validationErrors
}

const resetFields: NFormContext['resetFields'] = (properties = []) => {
  if (!props.model) {
    debugWarn(COMPONENT_NAME, 'model is required for resetFields to work.')

    return
  }

  filterFields(fields, properties).forEach((field) => field.resetField())
}

const clearValidate: NFormContext['clearValidate'] = (props_ = []) => {
  filterFields(fields, props_).forEach((field) => field.clearValidate())
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

<template>
  <form :class="formClasses">
    <slot />
  </form>
</template>
