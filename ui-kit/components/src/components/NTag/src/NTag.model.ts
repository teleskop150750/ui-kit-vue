import { componentSizes } from '@nado/ui-kit-constants'
import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Tag from './NTag.vue'

export const tagAppearances = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
export const tagMods = ['soft', 'solid', 'outline'] as const

export const tagProps = buildProps({
  closable: {
    type: Boolean,
    default: false,
  },
  appearance: {
    type: String,
    values: tagAppearances,
    default: 'primary',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    values: componentSizes,
    default: '',
  },
  mod: {
    type: String,
    values: tagMods,
    default: 'soft',
  },
  round: {
    type: Boolean,
    default: false,
  },
} as const)

export const tagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
} as const

export type NTagProps = ExtractPropTypes<typeof tagProps>
export type NTagEmits = typeof tagEmits
export type NTagInstance = InstanceType<typeof Tag>
