import { buildProps, definePropType, isBoolean } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter, Filter } from '../types'
import type NFilterManagerFormUpdateFilter from './NFilterManagerFormUpdateFilter.vue'

export const filterManagerFormUpdateFilterProps = buildProps({
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
  filter: {
    required: true,
    type: definePropType<Filter>(Object),
  },
  visible: {
    type: Boolean,
    default: false,
  },
} as const)

export const filterManagerFormUpdateFilterEmits = {
  'update:visible': (val: boolean) => isBoolean(val),
  update: (val: Filter) => !!val,
} as const

export type NFilterManagerFormUpdateFilterProps = ExtractPropTypes<typeof filterManagerFormUpdateFilterProps>
export type NFilterManagerFormUpdateFilterEmits = typeof filterManagerFormUpdateFilterEmits
export type NFilterManagerFormUpdateFilterInstance = InstanceType<typeof NFilterManagerFormUpdateFilter>
