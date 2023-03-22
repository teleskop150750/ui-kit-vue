import { isNumber } from '@ui/utils'
import { computed, inject, type InjectionKey, type Ref, ref, unref } from 'vue'

export const defaultInitialZIndex = 2000

const zIndex = ref(0)

export const Z_INDEX_CONTEXT_KEY: InjectionKey<Ref<number | undefined>> = Symbol('zIndexContextKey')

export function useZIndex(zIndexOverrides?: Ref<number>) {
  const zIndexInjection = zIndexOverrides || inject(Z_INDEX_CONTEXT_KEY, undefined)
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection)

    return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex
  })
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  const nextZIndex = () => {
    zIndex.value += 1

    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  }
}
