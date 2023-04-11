import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type Popper from './NPopper.vue'

const effects = ['light', 'dark'] as const
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const

export const Effect = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export const roleTypes = ['dialog', 'grid', 'group', 'listbox', 'menu', 'navigation', 'tooltip', 'tree'] as const

export type PopperEffect = (typeof effects)[number]
export type PopperTrigger = (typeof triggers)[number]

export const nPopperProps = buildProps({
  role: {
    type: String,
    values: roleTypes,
    default: 'tooltip',
  },
} as const)

export type NPopperProps = ExtractPropTypes<typeof nPopperProps>

export type NPopperInstance = InstanceType<typeof Popper>
