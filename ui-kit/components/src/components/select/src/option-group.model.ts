import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type OptionGroup from './NOptionGroup.vue'

export const optionGroupProps = buildProps({
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const)

export type NOptionGroupProps = ExtractPropTypes<typeof optionGroupProps>

export type NOptionGroupInstance = InstanceType<typeof OptionGroup>
