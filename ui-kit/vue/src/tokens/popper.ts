import type { Instance } from '@popperjs/core'
import type { Nillable } from '@ui/utils'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface MeasurableRect {
  height: number
  width: number
  x: number
  y: number
}

export interface Measurable {
  getBoundingClientRect: () => MeasurableRect
}

/**
 * triggerRef указывает элемент, который запускает popper
 * contentRef указывает на элемент содержимого popper
 * referenceRef указывает элемент, относительно которого содержимое всплывающего окна
 */
export interface NPopperInjectionContext {
  triggerRef: Ref<Nillable<Measurable>>
  contentRef: Ref<Nillable<HTMLElement>>
  referenceRef: Ref<Nillable<Measurable>>
  popperInstanceRef: Ref<Nillable<Instance>>
  role: ComputedRef<string>
}

export interface MPopperContentInjectionContext {
  arrowRef: Ref<Nillable<undefined>>
  arrowOffset: Ref<Nillable<number>>
  // arrowStyle: ComputedRef<CSSProperties>
}

export const POPPER_INJECTION_KEY: InjectionKey<NPopperInjectionContext> = Symbol('POPPER_INJECTION_KEY')

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<MPopperContentInjectionContext> =
  Symbol('POPPER_CONTENT_INJECTION_KEY')
