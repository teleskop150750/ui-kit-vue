import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { useSizeProp } from '@nado/ui-kit-hooks'
import { buildProps, isBoolean, isNumber, isString } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Radio from './NRadio.vue'

export const nRadioPropsBase = buildProps({
  /**
   * @description size of the Radio
   */
  size: useSizeProp,
  /**
   * @description whether Radio is disabled
   */
  disabled: Boolean,
  /**
   * @description the value of Radio
   */
  value: {
    type: [String, Number, Boolean],
    default: '',
  },
})

export const nRadioProps = buildProps({
  ...nRadioPropsBase,
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * @description native `name` attribute
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * @description whether to add a border around Radio
   */
  border: Boolean,
} as const)

export const nRadioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
}

export type NRadioProps = ExtractPropTypes<typeof nRadioProps>
export type NRadioEmits = typeof nRadioEmits
export type NRadioInstance = InstanceType<typeof Radio>
