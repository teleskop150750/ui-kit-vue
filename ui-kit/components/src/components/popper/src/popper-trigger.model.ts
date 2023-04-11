import { buildProps, definePropType } from '@nado/ui-kit-utils'

import type Trigger from './NPopperTrigger.vue'
import type { Measurable } from './tokens'

export const nPopperTriggerProps = buildProps({
  virtualRef: {
    type: definePropType<Measurable>(Object),
  },
  virtualTriggering: Boolean,
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
  open: Boolean,
} as const)

export type NPopperTriggerProps = typeof nPopperTriggerProps

export type NPopperTriggerInstance = InstanceType<typeof Trigger>
