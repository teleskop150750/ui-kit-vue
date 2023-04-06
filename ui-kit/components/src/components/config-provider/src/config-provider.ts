import { defineComponent, renderSlot } from 'vue'

import { nConfigProviderProps } from './config-provider.model'
import { provideGlobalConfig } from './hooks/use-global-config'

const ConfigProvider = defineComponent({
  name: 'NConfigProvider',
  props: nConfigProviderProps,

  setup(props, { slots }) {
    const config = provideGlobalConfig(props)

    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})

export type NConfigProviderInstance = InstanceType<typeof ConfigProvider>

export default ConfigProvider
