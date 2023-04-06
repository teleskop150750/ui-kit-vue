import { withInstall } from '@nado/ui-kit-utils'

import ConfigProvider from './src/config-provider'

export const NConfigProvider = withInstall(ConfigProvider)

export * from './src/config-provider'
export * from './src/config-provider.model'
export * from './src/constants'
export * from './src/hooks'
