<script lang="ts" setup>
import { UPDATE_MODEL_EVENT, ValidateComponentsMap } from '@nado/ui-kit-constants'
import { useAttrs, useNamespace } from '@nado/ui-kit-hooks'
import { NIconCircleClose, NIconHide, NIconView } from '@nado/ui-kit-icons-vue'
import { debugWarn, isClient, isKorean, isNil, isObject, NOOP } from '@nado/ui-kit-utils'
import { useResizeObserver } from '@vueuse/core'
import {
  computed,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  type StyleValue,
  toRef,
  useAttrs as useRawAttrs,
  useSlots,
  watch,
} from 'vue'

import { useFormDisabled, useFormItem, useFormSize } from '../../form'
import { useFormItemInputId } from '../../form/src/form/hooks'
import { nInputEmits, nInputProps } from './input.model'
import { calcTextareaHeight } from './utils'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

const props = defineProps(nInputProps)
const emit = defineEmits(nInputEmits)
const rawAttrs = useRawAttrs()
const slots = useSlots()

// Ref
const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const nativeRef = computed(() => inputRef.value || textareaRef.value)

// Ns
const nsInput = useNamespace('input')
const nsTextarea = useNamespace('textarea')

const containerAttrs = computed(() => {
  const comboBoxAttrs: Record<string, unknown> = {}

  if (props.containerRole === 'combobox') {
    comboBoxAttrs['aria-haspopup'] = rawAttrs['aria-haspopup']
    comboBoxAttrs['aria-owns'] = rawAttrs['aria-owns']
    comboBoxAttrs['aria-expanded'] = rawAttrs['aria-expanded']
  }

  return comboBoxAttrs
})

const attrs = useAttrs({
  excludeKeys: computed<string[]>(() => Object.keys(containerAttrs.value)),
})
const { form, formItem } = useFormItem()
const { inputId } = useFormItemInputId(props, {
  formItemContext: formItem,
})

const inputSize = useFormSize()
const inputDisabled = useFormDisabled()

const isFocused = ref(false)
const isHovering = ref(false)
const isComposing = ref(false)
const passwordVisible = ref(false)
const countStyle = ref<StyleValue>()
const textareaCalcStyle = shallowRef(props.inputStyle)

const needStatusIcon = computed(() => form?.statusIcon ?? false)
const validateState = computed(() => formItem?.validateState || '')
const validateIcon = computed(() => validateState.value && ValidateComponentsMap[validateState.value])
const passwordIcon = computed(() => (passwordVisible.value ? NIconView : NIconHide))
const containerStyle = computed<StyleValue>(() => [rawAttrs.style as StyleValue, props.inputStyle])
const textareaStyle = computed<StyleValue>(() => [props.inputStyle, textareaCalcStyle.value, { resize: props.resize }])
const nativeInputValue = computed(() => (isNil(props.modelValue) ? '' : String(props.modelValue)))
// TODO: Отображать только при заполненном инпуте !!nativeInputValue.value через css class n-input--is-dirty
// Чтобы не было скачков
const showClear = computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value)
const showPwdVisible = computed(
  () =>
    props.showPassword &&
    !inputDisabled.value &&
    !props.readonly &&
    !!nativeInputValue.value &&
    (!!nativeInputValue.value || isFocused.value),
)
const isWordLimitVisible = computed(
  () =>
    props.showWordLimit &&
    !!attrs.value.maxlength &&
    (props.type === 'text' || props.type === 'textarea') &&
    !inputDisabled.value &&
    !props.readonly &&
    !props.showPassword,
)
const textLength = computed(() => nativeInputValue.value.length)
const inputExceed = computed(
  () =>
    // показывать стиль превышения, если длина начального значения больше maxlength
    !!isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength),
)
const suffixVisible = computed(
  () =>
    !!slots.suffix ||
    !!props.suffixIcon ||
    props.clearable ||
    props.showPassword ||
    isWordLimitVisible.value ||
    (!!validateState.value && needStatusIcon.value),
)

const containerClasses = computed(() => {
  const ns = props.type === 'textarea' ? nsTextarea : nsInput

  return [
    ns.b(),
    ns.type('size', inputSize.value),
    ns.type('state', validateState.value),
    ns.is('disabled', inputDisabled.value),
    ns.is('exceed', inputExceed.value),
    ns.is('hovering', isHovering.value),
    ns.is('focused', isFocused.value),
    ns.has('prefix', !!slots.prefix || !!props.prefixIcon),
    ns.has('suffix', !!slots.suffix || !!props.suffixIcon || props.clearable || props.showPassword),
    {
      [nsInput.s('group')]: slots.prepend || slots.append,
      [nsInput.sm('group', 'append')]: slots.append,
      [nsInput.sm('group', 'prepend')]: slots.prepend,
      [nsInput.sm('suffix', 'password-clear')]: showClear.value && showPwdVisible.value,
    },
    rawAttrs.class,
  ]
})

useResizeObserver(textareaRef, (entries) => {
  if (!isWordLimitVisible.value || props.resize !== 'both') {
    return
  }

  const entry = entries[0]!
  const { width } = entry.contentRect

  countStyle.value = {
    /** right: 100% - width + padding(15) + right(6) */
    right: `calc(100% - ${width + 15 + 6}px)`,
  }
})

function resizeTextarea() {
  const { type, autosize } = props

  if (!isClient || type !== 'textarea' || !textareaRef.value) {
    return
  }

  if (autosize) {
    const minRows = isObject(autosize) ? autosize.minRows : undefined
    const maxRows = isObject(autosize) ? autosize.maxRows : undefined
    const textareaStyle = calcTextareaHeight(textareaRef.value, minRows, maxRows)

    // If the scrollbar is displayed, the height of the textarea needs more space than the calculated height.
    // If set textarea height in this case, the scrollbar will not hide.
    // So we need to hide scrollbar first, and reset it in next tick.
    // see https://github.com/element-plus/element-plus/issues/8825
    textareaCalcStyle.value = {
      overflowY: 'hidden',
      ...textareaStyle,
    }

    nextTick(() => {
      // NOTE: Force repaint to make sure the style set above is applied.
      // eslint-disable-next-line no-unused-expressions
      textareaRef.value!.offsetHeight
      textareaCalcStyle.value = textareaStyle as StyleValue
    })
  } else {
    textareaCalcStyle.value = {
      minHeight: calcTextareaHeight(textareaRef.value).minHeight,
    }
  }
}

function setNativeInputValue() {
  const input = nativeRef.value

  if (!input || input.value === nativeInputValue.value) {
    return
  }

  input.value = nativeInputValue.value
}

async function handleInput(evt: Event) {
  const { value } = evt.target as TargetElement

  // should not emit input during composition
  // see: https://github.com/ElemeFE/element/issues/10516
  if (isComposing.value) {
    return
  }

  emit(UPDATE_MODEL_EVENT, value)
  emit('input', value)

  // ensure native input value is controlled
  // see: https://github.com/ElemeFE/element/issues/12850
  await nextTick()
  setNativeInputValue()
}

function handleChange(evt: Event) {
  emit('change', (evt.target as TargetElement).value)
}

function handleCompositionStart(event: CompositionEvent) {
  emit('compositionstart', event)
  isComposing.value = true
}

function handleCompositionUpdate(event: CompositionEvent) {
  emit('compositionupdate', event)
  const text = (event.target as HTMLInputElement)?.value
  const lastCharacter = text.at(-1) || ''

  isComposing.value = !isKorean(lastCharacter)
}

function handleCompositionEnd(event: CompositionEvent) {
  emit('compositionend', event)

  if (isComposing.value) {
    isComposing.value = false
    handleInput(event)
  }
}

function handlePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
  focus()
}

async function focus() {
  // see: https://github.com/ElemeFE/element/issues/18573
  await nextTick()
  nativeRef.value?.focus()
}

function blur() {
  nativeRef.value?.blur()
}

function handleFocus(evt: FocusEvent) {
  isFocused.value = true
  emit('focus', evt)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false
  emit('blur', event)

  if (props.validateEvent) {
    formItem?.validate?.('blur').catch((error: Error) => debugWarn(error))
  }
}

function handleMouseLeave(evt: MouseEvent) {
  isHovering.value = false
  emit('mouseleave', evt)
}

function handleMouseEnter(evt: MouseEvent) {
  isHovering.value = true
  emit('mouseenter', evt)
}

function handleKeydown(evt: KeyboardEvent) {
  emit('keydown', evt)
}

function select() {
  nativeRef.value?.select()
}

function clear() {
  emit(UPDATE_MODEL_EVENT, '')
  emit('change', '')
  emit('clear')
  emit('input', '')
}

watch(
  () => props.modelValue,
  () => {
    nextTick(() => resizeTextarea())

    if (props.validateEvent) {
      formItem?.validate?.('change').catch((error: Error) => debugWarn(error))
    }
  },
)

// native input value is set explicitly
// do not use v-model / :value in template
// see: https://github.com/ElemeFE/element/issues/14521
watch(nativeInputValue, () => setNativeInputValue())

// when change between <input> and <textarea>,
// update DOM dependent value and styles
// https://github.com/ElemeFE/element/issues/14857
watch(
  () => props.type,
  async () => {
    await nextTick()
    setNativeInputValue()
    resizeTextarea()
  },
)

onMounted(() => {
  setNativeInputValue()
  nextTick(resizeTextarea)
})

defineExpose({
  inputRef,
  textareaRef,
  nativeRef,
  textareaStyle,
  autosize: toRef(props, 'autosize'),
  focus,
  blur,
  select,
  clear,
  resizeTextarea,
})
</script>

<script lang="ts">
export default {
  name: 'NInput',
  inheritAttrs: false,
}
</script>

<template>
  <div
    v-show="type !== 'hidden'"
    v-bind="containerAttrs"
    :class="containerClasses"
    :style="containerStyle"
    :role="containerRole"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" :class="nsInput.se('group', 'prepend')">
        <slot name="prepend" />
      </div>

      <div :class="nsInput.e('wrapper')" @focusout="handleBlur" @focusin="handleFocus">
        <!-- prefix slot -->
        <span v-if="$slots.prefix || prefixIcon" :class="nsInput.e('prefix')" @click="focus">
          <slot name="prefix" :classes="['n-icon', nsInput.e('icon')]" />
          <component :is="prefixIcon" v-if="prefixIcon" class="n-icon" :class="nsInput.e('icon')" />
        </span>

        <input
          :id="inputId"
          ref="inputRef"
          :class="nsInput.e('native')"
          v-bind="attrs"
          :value="nativeInputValue"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="inputDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :tabindex="tabindex"
          :aria-label="label"
          :placeholder="placeholder"
          :style="inputStyle"
          :form="props.form"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @compositionend="handleCompositionEnd"
          @input="handleInput"
          @change="handleChange"
          @keydown="handleKeydown"
        />

        <!-- suffix slot -->
        <span v-if="suffixVisible" :class="nsInput.e('suffix')" @click="focus">
          <button
            v-if="showClear"
            :class="nsInput.e('clear')"
            type="button"
            tabindex="-1"
            aria-label="clear"
            @mousedown.prevent="NOOP"
            @click="clear"
          >
            <NIconCircleClose class="n-icon" :class="nsInput.e('clear-icon')" />
          </button>

          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix" :classes="['n-icon', nsInput.e('icon')]" />
            <component :is="suffixIcon" v-if="suffixIcon" class="n-icon" :class="nsInput.e('icon')" />
          </template>

          <button v-if="showPwdVisible" type="button" :class="nsInput.e('password')" @click="handlePasswordVisible">
            <component :is="passwordIcon" class="n-icon" :class="nsInput.e('password-icon')" />
          </button>

          <span v-if="isWordLimitVisible" :class="nsInput.e('count')">
            <span :class="nsInput.e('count-inner')"> {{ textLength }} / {{ attrs.maxlength }} </span>
          </span>

          <component
            :is="validateIcon"
            v-if="validateState && validateIcon && needStatusIcon"
            class="n-icon"
            :class="[
              nsInput.e('icon'),
              nsInput.e('validate-icon'),
              nsInput.is('loading', validateState === 'validating'),
            ]"
          />
        </span>
      </div>

      <!-- append slot -->
      <div v-if="$slots.append" :class="nsInput.se('group', 'append')">
        <slot name="append" />
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        :id="inputId"
        ref="textareaRef"
        :class="nsTextarea.e('native')"
        v-bind="attrs"
        :tabindex="tabindex"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :style="textareaStyle"
        :aria-label="label"
        :placeholder="placeholder"
        :form="props.form"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span v-if="isWordLimitVisible" :style="countStyle" :class="nsTextarea.e('count')">
        {{ textLength }} / {{ attrs.maxlength }}
      </span>
    </template>
  </div>
</template>
