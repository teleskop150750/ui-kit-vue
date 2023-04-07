import { withInstall } from '@nado/ui-kit-utils'

import { NConfigProvider as ConfigProvider } from './src/NConfigProvider'

export const NConfigProvider = withInstall(ConfigProvider)

export * from './src/config-provider.model'
export * from './src/constants'
export * from './src/hooks'
