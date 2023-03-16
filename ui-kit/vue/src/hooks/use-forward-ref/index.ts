import type { Nillable } from '@ui/utils'
import { type InjectionKey, type ObjectDirective, provide, type Ref } from 'vue'

type ForwardRefSetter = <T>(el: T) => void

export interface ForwardRefInjectionContext {
  setForwardRef: ForwardRefSetter
}

export const FORWARD_REF_INJECTION_KEY: InjectionKey<ForwardRefInjectionContext> = Symbol('FORWARD_REF_INJECTION_KEY')

// TODO: ARROW
export function useForwardRef<T>(forwardRef: Ref<Nillable<T>>) {
  function setForwardRef(el: T) {
    forwardRef.value = el
  }

  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef,
  })
}

export function useForwardRefDirective(setForwardRef: ForwardRefSetter): ObjectDirective {
  return {
    mounted(el) {
      setForwardRef(el)
    },
    updated(el) {
      setForwardRef(el)
    },
    unmounted() {
      setForwardRef(undefined)
    },
  }
}
