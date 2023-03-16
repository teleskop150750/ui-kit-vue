import type { ComponentPublicInstance, Ref } from 'vue'

import { isFunction } from '../types'

export type RefSetter = (element: Element | ComponentPublicInstance | undefined) => void

export const composeRefs =
  (...refs: (Ref<HTMLElement | undefined> | RefSetter)[]) =>
  (element: Element | ComponentPublicInstance | null) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(element as Element | ComponentPublicInstance)
      } else {
        ref.value = element as HTMLElement | undefined
      }
    })
  }
