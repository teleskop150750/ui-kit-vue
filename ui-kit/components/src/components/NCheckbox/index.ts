import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Checkbox from './src/NCheckbox.vue'
import CheckboxButton from './src/NCheckboxButton.vue'
import CheckboxGroup from './src/NCheckboxGroup.vue'

export const NCheckbox = withInstall(Checkbox, {
  CheckboxButton,
  CheckboxGroup,
})

export const NCheckboxButton = withNoopInstall(CheckboxButton)
export const NCheckboxGroup = withNoopInstall(CheckboxGroup)

export * from './src/NCheckbox.model'
export * from './src/NCheckboxGroup.model'
export * from './src/tokens'
