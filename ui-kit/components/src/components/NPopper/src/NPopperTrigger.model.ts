import type { Measurable } from '@nado/ui-kit-hooks'
import { buildProps, definePropType } from '@nado/ui-kit-utils'

import type Trigger from './NPopperTrigger.vue'

export const popperTriggerProps = buildProps({
  virtualRef: {
    type: definePropType<Measurable>(Object),
  },
  isVirtualTriggering: Boolean,
  onMouseenter: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onMouseleave: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onClick: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onKeydown: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onFocus: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onBlur: {
    type: definePropType<(e: Event) => void>(Function),
  },
  onContextmenu: {
    type: definePropType<(e: Event) => void>(Function),
  },
  id: String,
  isOpen: Boolean,
} as const)

export type NPopperTriggerProps = typeof popperTriggerProps
export type NPopperTriggerInstance = InstanceType<typeof Trigger>
