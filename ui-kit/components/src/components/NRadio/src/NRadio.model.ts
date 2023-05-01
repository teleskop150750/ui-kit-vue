import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { useSizeProp } from '@nado/ui-kit-hooks'
import { buildProps, isBoolean, isNumber, isString } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Radio from './NRadio.vue'

export const radioPropsBase = buildProps({
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

export const radioProps = buildProps({
  ...radioPropsBase,
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

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
} as const

export type NRadioProps = ExtractPropTypes<typeof radioProps>
export type NRadioEmits = typeof radioEmits
export type NRadioInstance = InstanceType<typeof Radio>
