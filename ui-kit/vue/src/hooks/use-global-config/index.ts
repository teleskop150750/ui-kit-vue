import { CONFIG_PROVIDER_INJECTION_KEY, type ConfigProviderContext } from '@ui/tokens'
import { debugWarn, keysOf } from '@ui/utils'
import type { MaybeRef } from '@vueuse/core'
import { type App, computed, getCurrentInstance, inject, provide, type Ref, ref, unref } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
// this is meant to fix global methods like `ElMessage(opts)`, this way we can inject current locale
// into the component as default injection value.
// refer to: https://github.com/element-plus/element-plus/issues/2610#issuecomment-887965266
const globalConfig = ref<ConfigProviderContext>()

function mergeConfig(a: ConfigProviderContext, b: ConfigProviderContext): ConfigProviderContext {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
  const obj: Record<string, any> = {}

  for (const key of keys) {
    obj[key as string] = b[key as string] ?? a[key as string]
  }

  return obj
}

export function useGlobalConfig<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>(
  key: K,
  defaultValue?: D,
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>
export function useGlobalConfig(): Ref<ConfigProviderContext>
export function useGlobalConfig(key?: keyof ConfigProviderContext, defaultValue = undefined) {
  const config = getCurrentInstance() ? inject(CONFIG_PROVIDER_INJECTION_KEY, globalConfig) : globalConfig

  if (key) {
    return computed(() => config.value?.[key as string] ?? defaultValue)
  }

  return config
}

export function provideGlobalConfig(config: MaybeRef<ConfigProviderContext>, app?: App, global = false) {
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

  provideFn(CONFIG_PROVIDER_INJECTION_KEY, context)

  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }

  return context
}
