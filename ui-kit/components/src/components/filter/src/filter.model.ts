import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NFilter from './NFilter.vue'

export const nFilterProps = buildProps({
  searchFields: {
    type: definePropType<{ value: string; label: string }[]>(Array),
    default: () => [],
  },
})

export const nFilterEmits = {
  // click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type NFilterProps = ExtractPropTypes<typeof nFilterProps>
export type NFilterEmits = typeof nFilterEmits
export type NFilterInstance = InstanceType<typeof NFilter>
