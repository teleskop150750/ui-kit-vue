import type { Arrayable } from '@nado/ui-kit-utils'
import type { InjectionKey, Ref } from 'vue'

import type { TooltipTriggerType } from './tooltip-trigger.model'

export interface NTooltipInjectionContext {
  controlled: Ref<boolean>
  id: Ref<string>
  isOpen: Ref<boolean>
  trigger: Ref<Arrayable<TooltipTriggerType>>
  open: (e?: Event) => void
  close: (e?: Event) => void
  toggle: (e: Event) => void
  onShow: () => void
  onHide: () => void
  onBeforeShow: () => void
  onBeforeHide: () => void
  updatePopper: () => void
}

export const TOOLTIP_INJECTION_KEY: InjectionKey<NTooltipInjectionContext> = Symbol('TOOLTIP_INJECTION_KEY')
