import type { Instance } from '@popperjs/core'
import type { ComputedRef, CSSProperties, InjectionKey, Ref } from 'vue'

export interface Measurable {
  getBoundingClientRect: () => DOMRect
}

/**
 * triggerRef indicates the element that triggers popper
 * contentRef indicates the element of popper content
 * referenceRef indicates the element that popper content relative with
 */
export interface ElPopperInjectionContext {
  triggerRef: Ref<Measurable | undefined>
  contentRef: Ref<HTMLElement | undefined>
  popperInstanceRef: Ref<Instance | undefined>
  referenceRef: Ref<Measurable | undefined>
  role: ComputedRef<string>
}

export interface ElPopperContentInjectionContext {
  arrowRef: Ref<HTMLElement | undefined>
  arrowOffset: Ref<number | undefined>
  arrowStyle: ComputedRef<CSSProperties>
}

export const POPPER_INJECTION_KEY: InjectionKey<ElPopperInjectionContext> = Symbol('popper')

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<ElPopperContentInjectionContext> = Symbol('popperContent')
