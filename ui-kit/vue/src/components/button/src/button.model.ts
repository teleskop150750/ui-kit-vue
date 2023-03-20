import { useSizeProp } from '@ui/hooks'
import { buildProps, iconPropType } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

export const nButtonAppearances = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
export const nButtonMods = ['solid', 'soft', 'outline', 'text', 'link'] as const

const nButtonAlign = ['left', 'right', 'center', 'around', 'between', 'evenly'] as const

export const nButtonNativeTypes = ['button', 'submit', 'reset'] as const

export const nButtonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  appearance: {
    type: String,
    values: nButtonAppearances,
    default: 'primary',
  },
  mode: {
    type: String,
    values: nButtonMods,
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
    values: nButtonNativeTypes,
    default: 'button',
  },
  loading: Boolean,
  autofocus: Boolean,
  round: Boolean,
  align: {
    type: String,
    values: nButtonAlign,
    default: 'center',
  },
} as const)
export const nButtonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof nButtonProps>
export type ButtonEmits = typeof nButtonEmits

export type ButtonType = ButtonProps['type']
export type ButtonNativeType = ButtonProps['type']
