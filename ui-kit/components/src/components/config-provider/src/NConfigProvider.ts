import { defineComponent, renderSlot } from 'vue'

import { nConfigProviderProps } from './config-provider.model'
import { provideGlobalConfig } from './hooks/useGlobalConfig'

export const NConfigProvider = defineComponent({
  name: 'NConfigProvider',
  props: nConfigProviderProps,

  setup(props, { slots }) {
    const config = provideGlobalConfig(props)

    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})
