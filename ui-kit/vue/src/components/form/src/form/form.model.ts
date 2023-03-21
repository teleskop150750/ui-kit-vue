import { componentSizes } from '@ui/constants'
import { buildProps, definePropType, isArray, isBoolean, isString } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

import type { NFormItemProp } from '../form-item/form-item.model'
import type { NFormRules } from './types'

const formMetaProps = buildProps({
  size: {
    type: String,
    values: componentSizes,
  },
  disabled: Boolean,
} as const)

export const nFormProps = buildProps({
  ...formMetaProps,

  model: Object,
  rules: {
    type: definePropType<NFormRules>(Object),
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },
  labelSuffix: {
    type: String,
    default: '',
  },

  inline: Boolean,

  statusIcon: Boolean,
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
export type NFormProps = ExtractPropTypes<typeof nFormProps>
export type NFormMetaProps = ExtractPropTypes<typeof formMetaProps>

export const nFormEmits = {
  validate(prop: NFormItemProp, isValid: boolean, message: string) {
    return (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message)
  },
}
export type NFormEmits = typeof nFormEmits
