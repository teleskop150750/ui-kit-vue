import { componentSizes } from '@ui/constants'
import { type Arrayable, buildProps, definePropType } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

import type { FormItemRule } from './types'

export const formItemValidateStates = ['', 'error', 'validating', 'success'] as const
export type NFormItemValidateState = (typeof formItemValidateStates)[number]

export type NFormItemProp = Arrayable<string>

export const nFormItemProps = buildProps({
  label: String,
  prop: {
    type: definePropType<NFormItemProp>([String, Array]),
  },
  required: {
    type: Boolean,
    default: undefined,
  },
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
  error: String,
  validateStatus: {
    type: String,
    values: formItemValidateStates,
  },
  for: String,
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    values: componentSizes,
  },
} as const)
export type NFormItemProps = ExtractPropTypes<typeof nFormItemProps>
