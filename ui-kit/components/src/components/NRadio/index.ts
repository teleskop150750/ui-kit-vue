import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Radio from './src/NRadio.vue'
import RadioButton from './src/NRadioButton.vue'
import RadioGroup from './src/NRadioGroup.vue'

export const NRadio = withInstall(Radio, {
  RadioButton,
  RadioGroup,
})
export const NRadioGroup = withNoopInstall(RadioGroup)
export const NRadioButton = withNoopInstall(RadioButton)

export * from './src/NRadio.model'
export * from './src/NRadioButton.model'
export * from './src/NRadioGroup.model'
export * from './src/tokens'
