// import type { ConfigProviderProps } from '@ui/components/config-provider'
import type { InjectionKey, Ref } from 'vue'

// TODO: NADO
type ConfigProviderProps = any
export type ConfigProviderContext = Partial<ConfigProviderProps>

export const CONFIG_PROVIDER_INJECTION_KEY: InjectionKey<Ref<ConfigProviderContext>> = Symbol(
  'CONFIG_PROVIDER_INJECTION_KEY',
)
