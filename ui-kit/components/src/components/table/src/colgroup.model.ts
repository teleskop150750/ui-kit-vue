import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { NTableColumn } from './types'

export const nColgroupProps = buildProps({
  columns: {
    type: definePropType<NTableColumn[] | undefined>(Array),
    default: () => [],
  },
})

export type NColgroupProps = ExtractPropTypes<typeof nColgroupProps>
