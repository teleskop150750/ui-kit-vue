import type { FocusTrapOptions } from '@nado/focus-trap'
import type { Measurable } from '@nado/ui-kit-hooks'
import { buildProps, definePropType } from '@nado/ui-kit-utils'
import { type Options, type Placement, placements } from '@popperjs/core'
import type { ExtractPropTypes, StyleValue } from 'vue'

import type Content from './NPopperContent.vue'

type ClassObjectType = Record<string, boolean>
type ClassType = string | ClassObjectType | ClassType[]

const POSITIONING_STRATEGIES = ['fixed', 'absolute'] as const

export interface CreatePopperInstanceParams {
  referenceEl: Measurable | HTMLElement
  popperContentEl: HTMLElement
  arrowEl: HTMLElement | undefined
}

export const popperCoreConfigProps = buildProps({
  boundariesPadding: {
    type: Number,
    default: 0,
  },
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: undefined,
  },
  gpuAcceleration: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Number,
    default: 12,
  },
  placement: {
    type: String,
    values: placements,
    default: 'bottom',
  },
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}),
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: 'absolute',
  },
} as const)
export type PopperCoreConfigProps = ExtractPropTypes<typeof popperCoreConfigProps>

export const popperFocusTrapPops = buildProps({
  escapeDeactivates: {
    type: definePropType<FocusTrapOptions['escapeDeactivates']>([Function, Boolean]),
    default: true,
  },
  isTrapping: {
    type: Boolean,
    default: false,
  },
})

export const popperContentProps = buildProps({
  ...popperFocusTrapPops,
  ...popperCoreConfigProps,
  id: String,
  style: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  className: {
    type: definePropType<ClassType>([String, Array, Object]),
  },
  effect: {
    type: String,
    default: 'dark',
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true,
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: false,
  },
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object]),
  },
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  referenceEl: {
    type: definePropType<HTMLElement>(Object),
  },
  triggerTargetEl: {
    type: definePropType<HTMLElement>(Object),
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true,
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
  isVirtualTriggering: Boolean,
  zIndex: Number,
} as const)

export const popperContentEmits = {
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true,
}

export type NPopperContentProps = ExtractPropTypes<typeof popperContentProps>
export type NPopperContentEmits = typeof popperContentEmits
export type NPopperContentInstance = InstanceType<typeof Content>
