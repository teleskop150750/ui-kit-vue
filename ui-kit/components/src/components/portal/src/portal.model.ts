import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes, TeleportProps } from 'vue'

import type Portal from './NPortal.vue'

export const nPortalProps = buildProps({
  to: {
    type: definePropType<TeleportProps['to']>([String, Object]),
    default: 'body',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const)

export type NPortalProps = ExtractPropTypes<typeof nPortalProps>
export type NPortalInstance = InstanceType<typeof Portal>
