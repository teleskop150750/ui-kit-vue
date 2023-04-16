import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NIcon from './NIcon.vue'

export const nIconProps = buildProps({
  /**
   * @description SVG icon size, size x size
   */
  size: {
    type: definePropType<number | string>([Number, String]),
  },
  /**
   * @description SVG tag's fill attribute
   */
  color: {
    type: String,
  },
} as const)
export type NIconProps = ExtractPropTypes<typeof nIconProps>
export type NIconInstance = InstanceType<typeof NIcon>
