import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { NTableColumn } from './types'

export const colgroupProps = buildProps({
  columns: {
    type: definePropType<NTableColumn[] | undefined>(Array),
    default: () => [],
  },
} as const)

export type NColgroupProps = ExtractPropTypes<typeof colgroupProps>
