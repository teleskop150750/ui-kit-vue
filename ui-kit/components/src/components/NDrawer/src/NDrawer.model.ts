import { buildProps } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import { dialogProps } from '../../NDialog'

export const drawerProps = buildProps({
  ...dialogProps,
  direction: {
    type: String,
    values: ['ltr', 'rtl', 'ttb', 'btt'],
    default: 'rtl',
  },
  size: {
    type: [String, Number],
    default: '30%',
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  modalFade: {
    type: Boolean,
    default: true,
  },
} as const)

export type NDrawerProps = ExtractPropTypes<typeof drawerProps>

export { dialogEmits as drawerEmits } from '../../NDialog'
