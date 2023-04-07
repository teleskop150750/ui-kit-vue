import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NRadioButton from './NRadioButton.vue'
import { nRadioPropsBase } from './radio.model'

export const nRadioButtonProps = buildProps({
  ...nRadioPropsBase,
  /**
   * @description native 'name' attribute
   */
  name: {
    type: String,
    default: '',
  },
} as const)

export type NRadioButtonProps = ExtractPropTypes<typeof nRadioButtonProps>
export type NRadioButtonInstance = InstanceType<typeof NRadioButton>
