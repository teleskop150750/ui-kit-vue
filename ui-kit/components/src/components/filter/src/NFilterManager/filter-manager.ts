import { buildProps, definePropType, type Nillable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter, Filter } from '../types'
import type NFilterManager from './NFilterManager.vue'

export const filterManagerProps = buildProps({
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
  visibleInForm: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
  filters: {
    type: definePropType<Filter[]>(Array),
    default: () => [],
  },
  filter: {
    type: definePropType<Nillable<Filter>>(Object),
    default: undefined,
  },
} as const)

export const filterManagerEmits = {
  saveFilter: (val: Filter) => !!val,
  deleteFilter: (val: Filter) => !!val,
  clearFilter: () => true,
  selectFilter: (val: Filter) => !!val,
  updateFilter: (val: Filter) => !!val,
} as const

export type NFilterManagerProps = ExtractPropTypes<typeof filterManagerProps>
export type NFilterManagerEmits = typeof filterManagerEmits
export type NFilterManagerInstance = InstanceType<typeof NFilterManager>
