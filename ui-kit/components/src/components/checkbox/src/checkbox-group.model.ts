import { UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { useSizeProp } from '@nado/ui-kit-hooks'
import { buildProps, definePropType, isArray } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { CheckboxValueType } from './checkbox.model'
import type checkboxGroup from './NCheckboxGroup.vue'

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export const nCheckboxGroupProps = buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: definePropType<CheckboxGroupValueType>(Array),
    default: () => [],
  },
  /**
   * @description whether the nesting checkboxes are disabled
   */
  disabled: Boolean,
  /**
   * @description minimum number of checkbox checked
   */
  min: Number,
  /**
   * @description maximum number of checkbox checked
   */
  max: Number,
  /**
   * @description size of checkbox
   */
  size: useSizeProp,
  /**
   * @description label for screen reader
   */
  label: String,
  /**
   * @description element tag of the checkbox group
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
} as const)

export const nCheckboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val),
}

export type NCheckboxGroupProps = ExtractPropTypes<typeof nCheckboxGroupProps>
export type NCheckboxGroupEmits = typeof nCheckboxGroupEmits
export type NCheckboxGroupInstance = InstanceType<typeof checkboxGroup>
