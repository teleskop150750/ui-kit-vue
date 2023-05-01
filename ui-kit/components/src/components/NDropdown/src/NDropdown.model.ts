import { buildProps, definePropType, isBoolean, type Nillable } from '@nado/ui-kit-utils'
import type { Options } from '@popperjs/core'
import type { ExtractPropTypes } from 'vue'

import type { buttonAppearances, NButtonProps } from '../../NButton'
import { createCollectionWithScope } from '../../NCollection'
import { type Placement, roleTypes } from '../../NPopper'
import { useTooltipContentProps, useTooltipTriggerProps } from '../../NTooltip'
import type NDropdown from './NDropdown.vue'

export const dropdownProps = buildProps({
  trigger: useTooltipTriggerProps.trigger,
  effect: {
    ...useTooltipContentProps.effect,
    default: 'light',
  },
  type: {
    type: definePropType<typeof buttonAppearances>(String),
  },
  placement: {
    type: definePropType<Placement>(String),
    default: 'bottom',
  },
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}),
  },
  id: String,
  size: {
    type: String,
    default: '',
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  showTimeout: {
    type: Number,
    default: 150,
  },
  hideTimeout: {
    type: Number,
    default: 150,
  },
  tabindex: {
    type: definePropType<number | string>([Number, String]),
    default: 0,
  },
  maxHeight: {
    type: definePropType<number | string>([Number, String]),
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    values: roleTypes,
    default: 'menu',
  },
  buttonProps: {
    type: definePropType<NButtonProps>(Object),
  },
  teleported: useTooltipContentProps.teleported,
} as const)

export const dropdownEmits = {
  visibleChange: (value: Boolean) => isBoolean(value),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  command: (..._value: any) => true,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  hide: (_event: Nillable<Event>) => true,
  show: (_event: Nillable<Event>) => true,
} as const

const { NCollection, NCollectionItem, COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY } =
  createCollectionWithScope('Dropdown')

export {
  COLLECTION_INJECTION_KEY as DROPDOWN_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
  NCollection,
  NCollectionItem,
}

export type NDropdownProps = ExtractPropTypes<typeof dropdownProps>
export type NDropdownEmits = typeof dropdownEmits
export type NDropdownInstance = InstanceType<typeof NDropdown>
