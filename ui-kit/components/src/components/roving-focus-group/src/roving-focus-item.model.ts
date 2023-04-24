import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NRovingFocusItem from './NRovingFocusItem.vue'

export const nPovingFocusItemProps = buildProps({
  focusable: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

export const nPovingFocusItemEmits = {
  mousedown: (evt: MouseEvent) => evt instanceof MouseEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
}

export type NPovingFocusItemProps = ExtractPropTypes<typeof nPovingFocusItemProps>
export type NPovingFocusItemEmits = typeof nPovingFocusItemEmits
export type NRovingFocusItemInstance = InstanceType<typeof NRovingFocusItem>
