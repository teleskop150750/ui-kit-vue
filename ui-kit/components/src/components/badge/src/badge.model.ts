import { componentSizes } from '@nado/ui-kit-constants'
import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Tag from './NBadge.vue'

export const badgeAppearances = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
export const badgeMods = ['soft', 'solid', 'outline'] as const

export const nBadgeProps = buildProps({
  closable: {
    type: Boolean,
    default: false,
  },
  appearance: {
    type: String,
    values: badgeAppearances,
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
    values: badgeMods,
    default: 'soft',
  },
  round: {
    type: Boolean,
    default: false,
  },
} as const)

export type NBadgeProps = ExtractPropTypes<typeof nBadgeProps>

export const nBadgeEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type NBadgeEmits = typeof nBadgeEmits

export type NTagInstance = InstanceType<typeof Tag>
