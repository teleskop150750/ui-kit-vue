import type { UseNamespaceReturn } from '@nado/ui-kit-hooks'
import type { ComputedRef, CSSProperties, InjectionKey, Ref } from 'vue'

export interface DialogContext {
  dialogRef: Ref<HTMLElement | undefined>
  headerRef: Ref<HTMLElement | undefined>
  bodyId: Ref<string>
  ns: UseNamespaceReturn
  rendered: Ref<boolean>
  style: ComputedRef<CSSProperties>
}

export const DIALOG_INJECTION_KEY: InjectionKey<DialogContext> = Symbol('DIALOG_INJECTION_KEY')
