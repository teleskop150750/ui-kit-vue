import type { ExtractPropTypes } from 'vue'

import { nButtonProps } from './button.model'
import type ButtonGroup from './button-group.vue'

export const nButtonGroupProps = {
  size: nButtonProps.size,

  appearance: nButtonProps.appearance,
} as const

export type NButtonGroupProps = ExtractPropTypes<typeof nButtonGroupProps>

export type MButtonGroupInstance = InstanceType<typeof ButtonGroup>
