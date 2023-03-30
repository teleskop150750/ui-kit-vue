import { withInstall } from '@ui/utils'

import ConfigProvider from './src/config-provider'

export const NConfigProvider = withInstall(ConfigProvider)

export * from './src/config-provider'
export * from './src/config-provider.model'
export * from './src/constants'
export * from './src/hooks/use-global-config'
