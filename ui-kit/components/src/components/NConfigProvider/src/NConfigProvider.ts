import { defineComponent, renderSlot, watch } from 'vue'

import type { MessageConfigContext } from '../../NMessage/src/NMessage.model'
import { provideGlobalConfig } from './hooks/useGlobalConfig'
import { configProviderProps } from './NConfigProvider.model'

export const messageConfig: MessageConfigContext = {}

export const NConfigProvider = defineComponent({
  name: 'NConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    watch(
      () => props.message,
      (val) => {
        Object.assign(messageConfig, val ?? {})
      },
      { immediate: true, deep: true },
    )
    const config = provideGlobalConfig(props)

    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})
