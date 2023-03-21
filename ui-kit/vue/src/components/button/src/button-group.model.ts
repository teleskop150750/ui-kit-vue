import type { ExtractPropTypes } from 'vue'

import { nButtonProps } from './button.model'

export const nButtonGroupProps = {
  size: nButtonProps.size,

  appearance: nButtonProps.appearance,
} as const

export type NButtonGroupProps = ExtractPropTypes<typeof nButtonGroupProps>
