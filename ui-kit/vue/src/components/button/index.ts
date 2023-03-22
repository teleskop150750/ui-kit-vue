import { withInstall, withNoopInstall } from '@ui/utils'

import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

export const NButton = withInstall(Button, {
  NButtonGroup: ButtonGroup,
})
export const NButtonGroup = withNoopInstall(ButtonGroup)
export default NButton

export * from './src/button.model'
