import type { InjectionKey } from 'vue'

export interface NSyncScrollContext {
  addElement: (el: HTMLElement) => void
  removeElement: (el: HTMLElement) => void
}

export const SYNC_SCROLL_INJECTION_KEY: InjectionKey<NSyncScrollContext> = Symbol('SYNC_SCROLL_INJECTION_KEY')
