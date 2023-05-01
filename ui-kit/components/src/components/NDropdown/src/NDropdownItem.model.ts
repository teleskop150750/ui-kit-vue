import { buildProps, iconPropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NDropdownItem from './NDropdownItem.vue'

export const dropdownItemProps = buildProps({
  command: {
    type: [Object, String, Number],
    default: () => ({}),
  },
  disabled: Boolean,
  divided: {
    type: Boolean,
    default: false,
  },
  textValue: String,
  icon: {
    type: iconPropType,
  },
} as const)

export const dropdownItemEmits = {
  pointermove: (evt: PointerEvent) => evt instanceof PointerEvent,
  pointerleave: (evt: PointerEvent) => evt instanceof PointerEvent,
  click: (evt: MouseEvent | KeyboardEvent) => evt instanceof Event,
} as const

export type NDropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
export type NDropdownItemEmits = typeof dropdownItemEmits
export type NDropdownItemInstance = InstanceType<typeof NDropdownItem>
