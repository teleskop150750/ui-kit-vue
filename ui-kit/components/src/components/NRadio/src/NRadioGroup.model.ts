import { useSizeProp } from '@nado/ui-kit-hooks'
import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { radioEmits } from './NRadio.model'
import type RadioGroup from './NRadioGroup.vue'

export const radioGroupProps = buildProps({
  /**
   * @description native `id` attribute
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description the size of radio buttons or bordered radios
   */
  size: useSizeProp,
  /**
   * @description whether the nesting radios are disabled
   */
  disabled: Boolean,
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * @description same as `aria-label` in RadioGroup
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * @description native `name` attribute
   */
  name: {
    type: String,
    default: undefined,
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
} as const)
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = radioEmits
export type NRadioGroupEmits = typeof radioGroupEmits
export type NRadioGroupInstance = InstanceType<typeof RadioGroup>
