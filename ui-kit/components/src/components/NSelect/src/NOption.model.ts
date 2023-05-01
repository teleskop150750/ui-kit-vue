import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Option from './NOption.vue'
import type { SelectVModelValue } from './NSelect.model'

export const optionProps = buildProps({
  value: {
    required: true,
    type: definePropType<SelectVModelValue>([String, Number, Boolean, Object]),
  },
  label: {
    type: [String, Number],
  },
  created: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
} as const)

export type NOptionProps = ExtractPropTypes<typeof optionProps>

export type NOptionInstance = InstanceType<typeof Option>
