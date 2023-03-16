import type { Nillable } from '@ui/utils'
import type { Ref } from 'vue'

interface Params {
  focus: () => void
}

export function useFocus(el: Ref<Nillable<Params>>) {
  return {
    focus: () => {
      el.value?.focus?.()
    },
  }
}
