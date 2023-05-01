import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NRovingFocusItem from './NRovingFocusItem.vue'

export const povingFocusItemProps = buildProps({
  focusable: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
} as const)

export const povingFocusItemEmits = {
  mousedown: (evt: MouseEvent) => evt instanceof MouseEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
} as const

export type NPovingFocusItemProps = ExtractPropTypes<typeof povingFocusItemProps>
export type NPovingFocusItemEmits = typeof povingFocusItemEmits
export type NRovingFocusItemInstance = InstanceType<typeof NRovingFocusItem>
