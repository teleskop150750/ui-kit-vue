import { debugWarn } from '@nado/ui-kit-utils'
import { computed, type ComputedRef, getCurrentInstance } from 'vue'

interface Params {
  excludeListeners?: boolean
  excludeKeys?: ComputedRef<string[]>
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]/

export const useAttrs = (params: Params = {}): ComputedRef<Record<string, unknown>> => {
  const instance = getCurrentInstance()

  if (!instance) {
    debugWarn('use-attrs', 'getCurrentInstance() returned null. useAttrs() должен вызываться в setup function')

    return computed(() => ({}))
  }

  const { excludeListeners = false, excludeKeys } = params
  const allExcludeKeys = computed<string[]>(() => [...(excludeKeys?.value || []), ...DEFAULT_EXCLUDE_KEYS])

  return computed(() =>
    Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      Object.entries(instance.proxy?.$attrs!).filter(
        ([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key)),
      ),
    ),
  )
}
