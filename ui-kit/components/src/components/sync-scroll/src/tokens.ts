import type { InjectionKey } from 'vue'

export interface NSyncScrollContext {
  addEl: (el: HTMLElement) => void
  removeEl: (el: HTMLElement) => void
}

export const SYNC_SCROLL_INJECTION_KEY: InjectionKey<NSyncScrollContext> = Symbol('SYNC_SCROLL_INJECTION_KEY')
