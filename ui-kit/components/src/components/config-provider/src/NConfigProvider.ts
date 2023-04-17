import { defineComponent, renderSlot, watch } from 'vue'

import type { MessageConfigContext } from '../../message/src/message.model'
import { nConfigProviderProps } from './config-provider.model'
import { provideGlobalConfig } from './hooks/useGlobalConfig'

export const messageConfig: MessageConfigContext = {}

export const NConfigProvider = defineComponent({
  name: 'NConfigProvider',
  props: nConfigProviderProps,

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
