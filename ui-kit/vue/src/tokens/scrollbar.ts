import type { InjectionKey } from 'vue'

export interface ScrollbarContext {
  scrollbarElement: HTMLDivElement
  wrapElement: HTMLDivElement
}

export const SCROLLBAR_INJECTION_KEY: InjectionKey<ScrollbarContext> = Symbol('SCROLLBAR_INJECTION_KEY')
