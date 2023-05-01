import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { useSizeProp } from '@nado/ui-kit-hooks'
import { buildProps, definePropType, iconPropType, isString, mutable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes, StyleValue } from 'vue'

import type Input from './NInput.vue'

export type NInputAutoSize = { minRows?: number; maxRows?: number } | boolean

export const inputProps = buildProps({
  loading: {
    type: Boolean,
  },
  error: {
    type: Boolean,
  },
  id: {
    type: String,
    default: undefined,
  },
  size: useSizeProp,
  disabled: Boolean,
  modelValue: {
    type: definePropType<string | number | null | undefined>([String, Number, Object]),
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical'],
  },
  autosize: {
    type: definePropType<NInputAutoSize>([Boolean, Object]),
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  placeholder: {
    type: String,
  },
  form: {
    type: String,
  },
  /**
   * @description native input readonly
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description native input readonly
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description toggleable password input
   */
  showPassword: {
    type: Boolean,
    default: false,
  },
  /**
   * @description word count
   */
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  /**
   * @description suffix icon
   */
  suffixIcon: {
    type: iconPropType,
  },
  /**
   * @description prefix icon
   */
  prefixIcon: {
    type: iconPropType,
  },
  /**
   * @description container role, internal properties provided for use by the picker component
   */
  containerRole: {
    type: String,
    default: undefined,
  },
  /**
   * @description native input aria-label
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * @description input tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description input or texearea element style
   */
  inputStyle: {
    type: definePropType<StyleValue>([Object, Array, String]),
    default: () => mutable({} as const),
  },
} as const)

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  // focus: () => true,

  focus: (evt: FocusEvent) => evt instanceof Event,
  blur: (evt: FocusEvent) => evt instanceof Event,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  // NOTE: when autofill by browser, the keydown event is instanceof Event, not KeyboardEvent
  // relative bug report https://github.com/element-plus/element-plus/issues/6665
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
  // TODO: NADO не китайцы
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
}

export type NInputProps = ExtractPropTypes<typeof inputProps>
export type NInputEmits = typeof inputEmits
export type NInputInstance = InstanceType<typeof Input>
