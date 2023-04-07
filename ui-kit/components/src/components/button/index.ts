import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Button from './src/NButton.vue'
import ButtonGroup from './src/NButtonGroup.vue'

export const NButton = withInstall(Button, {
  NButtonGroup: ButtonGroup,
})
export const NButtonGroup = withNoopInstall(ButtonGroup)

export * from './src/button.model'
