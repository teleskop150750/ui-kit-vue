import {
  defaultInitialZIndex,
  LOCALE_CONTEXT_KEY,
  SIZE_INJECTION_KEY,
  useLocale,
  useNamespace,
  useZIndex,
  Z_INDEX_CONTEXT_KEY,
} from '@nado/ui-kit-hooks'
import { debugWarn, keysOf, type MaybeRef } from '@nado/ui-kit-utils'
import { type App, computed, getCurrentInstance, inject, provide, type Ref, ref, unref } from 'vue'

import { CONFIG_PROVIDER_CONTEXT_KEY, type NConfigProviderContext } from '../constants'

// this is meant to fix global methods like `ElMessage(opts)`, this way we can inject current locale
// into the component as default injection value.
// refer to: https://github.com/element-plus/element-plus/issues/2610#issuecomment-887965266
const globalConfig = ref<NConfigProviderContext>()

export function useGlobalConfig<K extends keyof NConfigProviderContext, D extends NConfigProviderContext[K]>(
  key: K,
  defaultValue?: D,
): Ref<Exclude<NConfigProviderContext[K], undefined> | D>
export function useGlobalConfig(): Ref<NConfigProviderContext>
export function useGlobalConfig(key?: keyof NConfigProviderContext, defaultValue = undefined) {
  const config = getCurrentInstance() ? inject(CONFIG_PROVIDER_CONTEXT_KEY, globalConfig) : globalConfig

  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  }

  return config
}

// for components like `ElMessage` `ElNotification` `ElMessageBox`.
export function useGlobalComponentSettings(block: string, sizeFallback?: MaybeRef<NConfigProviderContext['size']>) {
  const config = useGlobalConfig()

  const ns = useNamespace(block)

  const locale = useLocale(computed(() => config.value?.locale))
  const zIndex = useZIndex(computed(() => config.value?.zIndex || defaultInitialZIndex))
  const size = computed(() => unref(sizeFallback) || config.value?.size || '')

  provideGlobalConfig(computed(() => unref(config) || {}))

  return {
    ns,
    locale,
    zIndex,
    size,
  }
}

export function provideGlobalConfig(config: MaybeRef<NConfigProviderContext>, app?: App, global = false) {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined

  const provideFn = app?.provide ?? (inSetup ? provide : undefined)

  if (!provideFn) {
    debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().')

    return
  }

  const context = computed(() => {
    const cfg = unref(config)

    if (!oldConfig?.value) {
      return cfg
    }

    return mergeConfig(oldConfig.value, cfg)
  })

  provideFn(CONFIG_PROVIDER_CONTEXT_KEY, context)
  provideFn(
    LOCALE_CONTEXT_KEY,
    computed(() => context.value.locale),
  )

  provideFn(
    Z_INDEX_CONTEXT_KEY,
    computed(() => context.value.zIndex),
  )

  provideFn(SIZE_INJECTION_KEY, {
    // eslint-disable-next-line unicorn/explicit-length-check
    size: computed(() => context.value.size || ''),
  })

  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }

  return context
}

function mergeConfig(a: NConfigProviderContext, b: NConfigProviderContext): NConfigProviderContext {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: Record<string, any> = {}

  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }

  return obj
}
