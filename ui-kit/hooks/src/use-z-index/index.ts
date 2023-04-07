import { isNumber } from '@nado/ui-kit-utils'
import { computed, inject, type InjectionKey, type Ref, ref, unref } from 'vue'

const zIndex = ref(0)

export const defaultInitialZIndex = 2000

export const Z_INDEX_CONTEXT_KEY: InjectionKey<Ref<number | undefined>> = Symbol('Z_INDEX_CONTEXT_KEY')

export function useZIndex(zIndexOverrides?: Ref<number>) {
  const zIndexInjection = zIndexOverrides || inject(Z_INDEX_CONTEXT_KEY, undefined)
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection)

    return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex
  })
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  function nextZIndex() {
    zIndex.value += 1

    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  }
}

export type UseZIndexReturn = ReturnType<typeof useZIndex>
