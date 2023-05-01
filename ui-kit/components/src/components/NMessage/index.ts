import { withInstallFunction } from '@nado/ui-kit-utils'

import { Message } from './src/message'

export const NMessage = withInstallFunction(Message, '$message')

export * from './src/message'
