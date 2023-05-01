import { componentSizes } from '@nado/ui-kit-constants'
import { buildProps, definePropType, isArray, isBoolean, isString } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { NFormItemProp } from '../../NFormItem'
import type Form from './NForm.vue'
import type { NFormRules } from './types'

const formMetaProps = buildProps({
  size: {
    type: String,
    values: componentSizes,
  },
  disabled: Boolean,
} as const)

export const formProps = buildProps({
  ...formMetaProps,

  model: Object,
  rules: {
    type: definePropType<NFormRules>(Object),
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  labelSuffix: {
    type: String,
    default: '',
  },

  statusIcon: {
    type: Boolean,
    default: true,
  },

  showMessage: {
    type: Boolean,
    default: true,
  },

  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  scrollToError: Boolean,
} as const)

export const formEmits = {
  validate(prop: NFormItemProp, isValid: boolean, messages: string[]) {
    return (isArray(prop) || isString(prop)) && isBoolean(isValid) && Array.isArray(messages)
  },
} as const

export type NFormProps = ExtractPropTypes<typeof formProps>
export type NFormMetaProps = ExtractPropTypes<typeof formMetaProps>
export type NFormEmits = typeof formEmits
export type NFormInstance = InstanceType<typeof Form>
