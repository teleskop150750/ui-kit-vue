<script setup lang="ts">
import { arrWrap, cloneObject, getProp, isFunction } from '@nado/ui-kit-utils'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { object, type Schema, type ValidationError } from 'yup'

import { FormValidationError } from '../errors/ValidateError'
import { useFormSize } from '../hooks/useFormSize'
import { FORM_CONTEXT_INJECTION_KEY } from '../NForm/tokens'
import {
  useFieldRules,
  useFieldValue,
  useLabelId,
  usePropName,
  useShouldShowError,
  useStyleClasses,
  useValidationState,
} from './hooks'
import { formItemProps } from './NFormItem.model'
import { FORM_ITEM_INJECTION_KEY, type NFormItemContext } from './tokens'

const props = defineProps(formItemProps)

const formContext = inject(FORM_CONTEXT_INJECTION_KEY, undefined)
const size = useFormSize(undefined, { formItem: false })

const { validateState, setValidationState } = useValidationState()
const { shouldShowError } = useShouldShowError(props, validateState)
const validateMessages = ref<string[]>([])
const formItemRef = ref<HTMLDivElement>()
const sliceValidateMessages = computed(() => {
  if (props.maxErrors < 1) {
    return validateMessages.value
  }

  return validateMessages.value.slice(0, props.maxErrors)
})
const shouldShowHint = computed(() => props.hint && !shouldShowError.value && sliceValidateMessages.value)
// special inline value.
let initialValue: unknown = undefined
let isResettingField = false

const { fieldRules, filterRulesByTrigger } = useFieldRules(props)
const { hasLabel, currentLabel, labelFor, labelId, inputIds, addInputId, removeInputId } = useLabelId(props)
const isRequired = computed(() =>
  fieldRules.value.some((rule) => rule.rule.spec.nullable === false && rule.rule.spec.optional === false),
)
const { ns, formItemClasses } = useStyleClasses({
  props,
  isRequired,
  size,
  validateState,
})

const { propName } = usePropName(props)

const isGroup = computed<boolean>(() => !labelFor.value && hasLabel.value)

const { fieldValue } = useFieldValue(props)

const hasRules = computed(() => fieldRules.value.length > 0)

const validate: NFormItemContext['validate'] = async (trigger, callback) => {
  // skip validation if its resetting
  if (isResettingField || !props.prop) {
    return false
  }

  const shouldThrow = !isFunction(callback)

  if (!hasRules.value) {
    callback?.(false)

    return false
  }

  const filteredRules = filterRulesByTrigger(fieldRules, trigger)

  if (filteredRules.length === 0) {
    callback?.(true)

    return true
  }

  setValidationState('validating')

  return doValidate(filteredRules)
    .then(() => {
      // eslint-disable-next-line promise/no-callback-in-promise
      callback?.(true)

      return true as const
    })
    .catch((error: FormValidationError) => {
      const { fields } = error

      // eslint-disable-next-line promise/no-callback-in-promise
      callback?.(false, fields)

      if (shouldThrow) {
        throw fields
      }

      return false
    })
}

async function doValidate(rules: Schema[]): Promise<true> {
  const modelName = propName.value

  const promises = rules.map((rule) =>
    object({
      [modelName]: rule,
    }).validate({ [modelName]: fieldValue.value }),
  )

  const errors: ValidationError[] = []

  // eslint-disable-next-line promise/always-return
  await Promise.allSettled(promises).then((results) => {
    results.forEach((el) => {
      if (el.status === 'rejected') {
        errors.push(el.reason)
      }
    })
  })

  if (errors) {
    const formValidationError = new FormValidationError(errors, {
      [modelName]: errors,
    })

    onValidationFailed(formValidationError)

    throw formValidationError
  }

  onValidationSucceeded()

  return true as const
}

function onValidationSucceeded() {
  setValidationState('success')
  formContext?.emit('validate', props.prop!, true, [])
}

function onValidationFailed(error: FormValidationError) {
  const { errors, fields } = error

  if (!errors || !fields) {
    // console.error(error)
  }

  setValidationState('danger')
  validateMessages.value = (errors || []).flatMap((el) => el?.errors || `${props.prop} is required`)

  formContext?.emit('validate', props.prop!, false, validateMessages.value)
}

const clearValidate: NFormItemContext['clearValidate'] = () => {
  setValidationState('')
  validateMessages.value = []
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
    validateMessages.value = val ? arrWrap(val) : []
    setValidationState(val ? 'danger' : '')
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
  validateMessages,
  validateState,
  validate,
  clearValidate,
  resetField,
})
</script>

<script lang="ts">
export default {
  name: 'NFormItem',
}
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
    </div>
    <div :class="ns.e('detail')">
      <div v-if="shouldShowHint" :class="[ns.e('message'), ns.eType('message', 'type', 'hint')]">
        <div :class="ns.e('message-text')">
          {{ hint }}
        </div>
      </div>
      <slot v-if="shouldShowError" name="errors" :errors="sliceValidateMessages">
        <div
          v-for="(message, n) in sliceValidateMessages"
          :key="n"
          :class="[ns.e('message'), ns.eType('message', 'type', 'error')]"
        >
          <div :class="ns.e('message-text')">
            {{ message }}
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-form-item/index.css');
</style>
