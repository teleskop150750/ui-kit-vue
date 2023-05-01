import type { ExtractPropTypes } from 'vue'

import { buttonProps } from './NButton.model'
import type ButtonGroup from './NButtonGroup.vue'

export const buttonGroupProps = {
  size: buttonProps.size,

  appearance: buttonProps.appearance,
} as const

export type NButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export type MButtonGroupInstance = InstanceType<typeof ButtonGroup>
