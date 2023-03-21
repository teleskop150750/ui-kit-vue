import { type ComponentSize, componentSizes } from '@ui/constants'
import { buildProp } from '@ui/utils'
import { computed, inject, type InjectionKey, type Ref, unref } from 'vue'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const)

export const useSizeProps = {
  size: useSizeProp,
}

export interface SizeContext {
  size: Ref<ComponentSize>
}

export const SIZE_INJECTION_KEY: InjectionKey<SizeContext> = Symbol('size')

export function useGlobalSize() {
  const injectedSize = inject(SIZE_INJECTION_KEY, {} as SizeContext)

  return computed<ComponentSize>(() => unref(injectedSize.size) || '')
}
