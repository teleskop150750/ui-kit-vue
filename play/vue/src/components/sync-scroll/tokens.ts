import type { InjectionKey } from 'vue'

export interface SyncScrollContext {
  addEl: (el: HTMLElement) => void
  removeEl: (el: HTMLElement) => void
}

export const SYNC_SCROLL_INJECTION_KEY: InjectionKey<SyncScrollContext> = Symbol('SYNC_SCROLL_INJECTION_KEY')
