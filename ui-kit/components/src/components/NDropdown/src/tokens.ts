import type { Nillable } from '@nado/ui-kit-utils'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface NDropdownInjectionContext {
  contentRef: Ref<Nillable<HTMLElement>>
  role: ComputedRef<string>
  triggerId: ComputedRef<string>
  isUsingKeyboard: Ref<boolean>
  onItemLeave: (event: PointerEvent) => void
  onItemEnter: (event: PointerEvent) => void

  dropdownSize: ComputedRef<string>
  hideOnClick?: ComputedRef<boolean>
  handleClick?: () => void
  commandHandler?: (...arg: any[]) => void
}

export const DROPDOWN_INJECTION_KEY: InjectionKey<NDropdownInjectionContext> = Symbol('DROPDOWN_INJECTION_KEY')
