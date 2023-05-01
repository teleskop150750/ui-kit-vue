import { withInstall } from '@nado/ui-kit-utils'

import { NConfigProvider as ConfigProvider } from './src/NConfigProvider'

export const NConfigProvider = withInstall(ConfigProvider)

export * from './src/constants'
export * from './src/hooks'
export { messageConfig } from './src/NConfigProvider'
export * from './src/NConfigProvider.model'
