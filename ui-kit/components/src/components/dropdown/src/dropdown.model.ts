import { EVENT_CODE } from '@nado/ui-kit-constants'
import { buildProps, definePropType, iconPropType } from '@nado/ui-kit-utils'
import type { Options, Placement } from '@popperjs/core'
import type { Nullable } from 'vitest'
// import { createCollectionWithScope } from '@ui/components/collection'
import type { ComponentInternalInstance, ComputedRef } from 'vue'

import type { NButtonProps, NButtonType } from '../../button'
import { useTooltipContentProps, useTooltipTriggerProps } from '../../tooltip'

export interface INDropdownInstance {
  instance?: ComponentInternalInstance
  dropdownSize?: ComputedRef<string>
  handleClick?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commandHandler?: (...arg: any[]) => void
  show?: () => void
  hide?: () => void
  trigger?: ComputedRef<string>
  hideOnClick?: ComputedRef<boolean>
  triggerElm?: ComputedRef<Nullable<HTMLButtonElement>>
}

export const dropdownProps = buildProps({
  trigger: useTooltipTriggerProps.trigger,
  effect: {
    ...useTooltipContentProps.effect,
    default: 'light',
  },
  type: {
    type: definePropType<NButtonType>(String),
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
    default: 'menu',
  },
  buttonProps: {
    type: definePropType<NButtonProps>(Object),
  },
  teleported: useTooltipContentProps.teleported,
} as const)

export const dropdownItemProps = buildProps({
  command: {
    type: [Object, String, Number],
    default: () => ({}),
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: iconPropType,
  },
} as const)

export const dropdownMenuProps = buildProps({
  onKeydown: { type: definePropType<(e: KeyboardEvent) => void>(Function) },
})

export const FIRST_KEYS = [EVENT_CODE.down, EVENT_CODE.pageDown, EVENT_CODE.home]

export const LAST_KEYS = [EVENT_CODE.up, EVENT_CODE.pageUp, EVENT_CODE.end]

export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]

// const { ElCollection, ElCollectionItem, COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY } =
//   createCollectionWithScope('Dropdown')

// export {
//   COLLECTION_INJECTION_KEY as DROPDOWN_COLLECTION_INJECTION_KEY,
//   COLLECTION_ITEM_INJECTION_KEY as DROPDOWN_COLLECTION_ITEM_INJECTION_KEY,
//   ElCollection,
//   ElCollectionItem,
// }
