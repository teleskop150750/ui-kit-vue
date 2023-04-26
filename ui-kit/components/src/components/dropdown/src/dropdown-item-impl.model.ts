import type { ExtractPropTypes } from 'vue'

import { dropdownItemProps } from './dropdown-item.model'
import type NDropdownItemImpl from './NDropdownItemImpl.vue'

export const dropdownItemImplProps = dropdownItemProps

export const dropdownItemImplEmits = {
  pointermove: (evt: PointerEvent) => evt instanceof PointerEvent,
  pointerleave: (evt: PointerEvent) => evt instanceof PointerEvent,
  click: (evt: PointerEvent) => evt instanceof PointerEvent,
  clickImpl: (evt: MouseEvent | KeyboardEvent) => evt instanceof Event,
} as const

export type NDropdownItemImplProps = ExtractPropTypes<typeof dropdownItemImplProps>
export type NDropdownItemImplEmits = typeof dropdownItemImplEmits
export type NDropdownItemImplInstance = InstanceType<typeof NDropdownItemImpl>
