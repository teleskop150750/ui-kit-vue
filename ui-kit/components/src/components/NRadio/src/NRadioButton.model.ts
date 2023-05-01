import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { radioPropsBase } from './NRadio.model'
import type NRadioButton from './NRadioButton.vue'

export const radioButtonProps = buildProps({
  ...radioPropsBase,
  /**
   * @description native 'name' attribute
   */
  name: {
    type: String,
    default: '',
  },
} as const)

export type NRadioButtonProps = ExtractPropTypes<typeof radioButtonProps>
export type NRadioButtonInstance = InstanceType<typeof NRadioButton>
