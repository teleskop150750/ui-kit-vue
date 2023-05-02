import { componentSizes } from '@nado/ui-kit-constants'
import { type Arrayable, buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type FormItem from './NFormItem.vue'
import type { FormItemRule } from './types'

export const formItemValidateStates = ['', 'danger', 'validating', 'success'] as const
export type NFormItemValidateState = (typeof formItemValidateStates)[number]

export type NFormItemProp = Arrayable<string>

export const formItemProps = buildProps({
  label: String,
  prop: {
    type: definePropType<NFormItemProp>([String, Array]),
  },
  required: {
    type: Boolean,
    default: undefined,
  },
  hint: {
    type: String,
    default: undefined,
  },
  maxErrors: {
    type: Number,
    default: 0,
  },
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
  error: {
    type: definePropType<NFormItemProp>([String, Array]),
  },
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

export type NFormItemProps = ExtractPropTypes<typeof formItemProps>
export type NFormItemInstance = InstanceType<typeof FormItem>
