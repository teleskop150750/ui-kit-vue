import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Option from './src/NOption.vue'
import OptionGroup from './src/NOptionGroup.vue'
import Select from './src/NSelect.vue'

export const NSelect = withInstall(Select, {
  Option,
  OptionGroup,
})
export const NOption = withNoopInstall(Option)
export const NOptionGroup = withNoopInstall(OptionGroup)

export * from './src/NOption.model'
export * from './src/NOptionGroup.model'
export * from './src/NSelect.model'
export * from './src/token'
