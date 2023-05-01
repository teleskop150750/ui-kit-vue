import type { InjectionKey, Ref, StyleValue } from 'vue'

import type { NRovingFocusGroupProps } from './NRovingFocusGroup.model'

type EventHandler<T = Event> = (event: T) => void

export interface RovingGroupInjectionContext {
  currentTabbedId: Ref<string | undefined>
  dir: Ref<NRovingFocusGroupProps['dir']>
  loop: Ref<NRovingFocusGroupProps['loop']>
  orientation: Ref<NRovingFocusGroupProps['orientation']>
  tabIndex: Ref<number>
  rovingFocusGroupRef: Ref<HTMLElement | undefined>
  rovingFocusGroupRootStyle: Ref<StyleValue>
  onBlur: EventHandler<FocusEvent>
  onFocus: EventHandler<FocusEvent>
  onMousedown: EventHandler<MouseEvent>
  onItemFocus: (id: string) => void
  onItemShiftTab: () => void
}

export interface RovingFocusGroupItemInjectionContext {
  rovingFocusGroupItemRef: Ref<HTMLElement | undefined>
  tabIndex: Ref<number>
  handleMousedown: EventHandler<MouseEvent>
  handleFocus: EventHandler<FocusEvent>
  handleKeydown: EventHandler<KeyboardEvent>
}

export const ROVING_FOCUS_GROUP_INJECTION_KEY: InjectionKey<RovingGroupInjectionContext> = Symbol(
  'ROVING_FOCUS_GROUP_INJECTION_KEY',
)

export const ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY: InjectionKey<RovingFocusGroupItemInjectionContext> = Symbol(
  'ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY',
)
