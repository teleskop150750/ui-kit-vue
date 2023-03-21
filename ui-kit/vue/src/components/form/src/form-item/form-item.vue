<script lang="ts" setup>
import { type RuleItem, useAsyncValidator } from '@nado/async-validator'
import { cloneObject, getProp, isFunction } from '@ui/utils'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'

import type { NFormValidateFailure } from '../form/types'
import { useFormSize } from '../shared'
import { FORM_CONTEXT_INJECTION_KEY, FORM_ITEM_INJECTION_KEY, type NFormItemContext } from '../tokens'
import { nFormItemProps } from './form-item.model'
import {
  useFieldRules,
  useFieldValue,
  useLabelId,
  usePropName,
  useShouldShowError,
  useStyleClasses,
  useValidationState,
} from './hooks'

const props = defineProps(nFormItemProps)

const formContext = inject(FORM_CONTEXT_INJECTION_KEY, undefined)

const size = useFormSize(undefined, { formItem: false })

const { validateState, setValidationState } = useValidationState()
const { shouldShowError } = useShouldShowError(props, validateState)
const validateMessage = ref('')
const formItemRef = ref<HTMLDivElement>()
// special inline value.
let initialValue: unknown = undefined
let isResettingField = false
// ===========
const { fieldRules, filterRules } = useFieldRules(props)
const { hasLabel, currentLabel, labelFor, labelId, inputIds, addInputId, removeInputId } = useLabelId(props)
const isRequired = computed(() => fieldRules.value.some((rule) => rule.required))
const { ns, formItemClasses, validateClasses } = useStyleClasses({
  props,
  isRequired,
  size,
  validateState,
})

const { propName } = usePropName(props)

const isGroup = computed<boolean>(() => !labelFor.value && hasLabel.value)

const { fieldValue } = useFieldValue(props)

const validateEnabled = computed(() => fieldRules.value.length > 0)

function onValidationFailed(error: NFormValidateFailure) {
  const { errors, fields } = error

  if (!errors || !fields) {
    console.error(error)
  }

  setValidationState('error')
  validateMessage.value = errors ? errors?.[0]?.message ?? `${props.prop} is required` : ''

  formContext?.emit('validate', props.prop!, false, validateMessage.value)
}

function onValidationSucceeded() {
  setValidationState('success')
  formContext?.emit('validate', props.prop!, true, '')
}

async function doValidate(rules: RuleItem[]): Promise<true> {
  const modelName = propName.value
  const { useSchema } = useAsyncValidator()
  const validator = useSchema({
    [modelName]: rules,
  })

  return validator
    .validateWithOptions({ [modelName]: fieldValue.value }, { firstFields: true })
    .then(() => {
      onValidationSucceeded()

      return true as const
    })
    .catch((error: NFormValidateFailure) => {
      onValidationFailed(error as NFormValidateFailure)

      throw error
    })
}

const validate: NFormItemContext['validate'] = async (trigger, callback) => {
  // skip validation if its resetting
  if (isResettingField || !props.prop) {
    return false
  }

  const hasCallback = isFunction(callback)

  if (!validateEnabled.value) {
    callback?.(false)

    return false
  }

  const filteredRules = filterRules(trigger)

  if (filteredRules.length === 0) {
    callback?.(true)

    return true
  }

  setValidationState('validating')

  return doValidate(filteredRules)
    .then(() => {
      callback?.(true)

      return true as const
    })
    .catch((error: NFormValidateFailure) => {
      const { fields } = error

      callback?.(false, fields)

      return hasCallback ? false : Promise.reject(fields)
    })
}

const clearValidate: NFormItemContext['clearValidate'] = () => {
  setValidationState('')
  validateMessage.value = ''
  isResettingField = false
}

const resetField: NFormItemContext['resetField'] = async () => {
  const model = formContext?.model

  if (!model || !props.prop) {
    return
  }

  const computedValue = getProp(model, props.prop)

  // prevent validation from being triggered
  isResettingField = true

  computedValue.value = cloneObject(initialValue)

  await nextTick()
  clearValidate()

  isResettingField = false
}

watch(
  () => props.error,
  (val) => {
    validateMessage.value = val || ''
    setValidationState(val ? 'error' : '')
  },
  { immediate: true },
)

watch(
  () => props.validateStatus,
  (val) => setValidationState(val || ''),
)

const context: NFormItemContext = reactive({
  ...toRefs(props),
  $el: formItemRef,
  size,
  validateState,
  labelId,
  inputIds,
  isGroup,
  hasLabel,
  addInputId,
  removeInputId,
  resetField,
  clearValidate,
  validate,
})

provide(FORM_ITEM_INJECTION_KEY, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = cloneObject(fieldValue.value)
  }
})

onBeforeUnmount(() => {
  formContext?.removeField(context)
})

defineExpose({
  size,
  validateMessage,
  validateState,
  validate,
  clearValidate,
  resetField,
})
</script>

<template>
  <div
    ref="formItemRef"
    :class="formItemClasses"
    :role="isGroup ? 'group' : undefined"
    :aria-labelledby="isGroup ? labelId : undefined"
  >
    <component :is="labelFor ? 'label' : 'div'" v-if="hasLabel" :id="labelId" :for="labelFor" :class="ns.e('label')">
      <slot name="label" :label="currentLabel">
        {{ currentLabel }}
      </slot>
    </component>

    <div :class="ns.e('content')">
      <slot />
      <transition-group :name="`${ns.namespace}-zoom-in-top`">
        <slot v-if="shouldShowError" name="error" :error="validateMessage">
          <div :class="validateClasses">
            {{ validateMessage }}
          </div>
        </slot>
      </transition-group>
    </div>
  </div>
</template>
