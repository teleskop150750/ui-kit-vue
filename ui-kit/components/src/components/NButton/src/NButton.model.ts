import { useSizeProp } from '@nado/ui-kit-hooks'
import { buildProps, iconPropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { useRouterLinkProps } from '../../NConfigProvider'
import type NButton from './NButton.vue'

export const buttonAppearances = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
export const buttonMods = ['solid', 'soft', 'outline', 'text', 'link'] as const

const buttonAlign = ['left', 'right', 'center', 'around', 'between', 'evenly'] as const

export const buttonTypes = ['button', 'submit', 'reset'] as const

export const buttonProps = buildProps({
  ...useRouterLinkProps,
  tag: {
    type: String,
    default: 'button',
  },
  size: useSizeProp,
  disabled: Boolean,
  appearance: {
    type: String,
    values: buttonAppearances,
    default: '',
  },
  mode: {
    type: String,
    values: buttonMods,
    default: 'solid',
  },
  label: {
    type: [Number, String],
    default: '',
  },
  icon: {
    type: iconPropType,
  },
  iconRight: {
    type: iconPropType,
  },
  type: {
    type: String,
    values: buttonTypes,
    default: 'button',
  },
  loading: Boolean,
  autofocus: Boolean,
  round: Boolean,
  align: {
    type: String,
    values: buttonAlign,
    default: 'center',
  },
} as const)

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
} as const

export type NButtonProps = ExtractPropTypes<typeof buttonProps>
export type NButtonEmits = typeof buttonEmits

export type NButtonType = NButtonProps['type']
export type NButtonInstance = InstanceType<typeof NButton>
