import type { InjectionKey, Ref } from 'vue'

import type { NConfigProviderProps } from './NConfigProvider.model'

export type NConfigProviderContext = Partial<NConfigProviderProps>

export const CONFIG_PROVIDER_CONTEXT_KEY: InjectionKey<Ref<NConfigProviderContext>> =
  Symbol('CONFIG_PROVIDER_CONTEXT_KEY')
