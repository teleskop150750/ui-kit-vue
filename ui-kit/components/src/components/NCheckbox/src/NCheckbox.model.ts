import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { useSizeProp } from '@nado/ui-kit-hooks'
import { buildProps, isBoolean, isNumber, isString } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Checkbox from './NCheckbox.vue'

export type CheckboxValueType = string | number | boolean

export const checkboxProps = buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: [Number, String, Boolean],
    default: undefined,
  },
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  val: {
    type: [String, Boolean, Number, Object],
    default: undefined,
  },
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate: Boolean,
  /**
   * @description whether the Checkbox is disabled
   */
  disabled: Boolean,
  /**
   * @description if the Checkbox is checked
   */
  checked: Boolean,
  /**
   * @description native 'name' attribute
   */
  name: {
    type: String,
    default: undefined,
  },
  /**
   * @description value of the Checkbox if it's checked
   */
  trueValue: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description value of the Checkbox if it's not checked
   */
  falseValue: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description input id
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description label
   */
  label: {
    type: String,
  },
  /**
   * @description same as [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls), takes effect when `indeterminate` is `true`
   */
  controls: {
    type: String,
    default: undefined,
  },
  /**
   * @description whether to add a border around Checkbox
   */
  border: Boolean,
  /**
   * @description size of the Checkbox
   */
  size: useSizeProp,
  /**
   * @description input tabindex
   */
  tabindex: {
    type: [String, Number],
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
} as const)

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) => isString(val) || isNumber(val) || isBoolean(val),
  change: (val: CheckboxValueType) => isString(val) || isNumber(val) || isBoolean(val),
} as const

export type NCheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type NCheckboxEmits = typeof checkboxEmits
export type NCheckboxInstance = InstanceType<typeof Checkbox>
