import { buildProps, definePropType, isArray, type Nillable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter, Filter, SearchField } from '../types'
import type NFilter from './NFilter.vue'

export const nFilterProps = buildProps({
  searchFields: {
    type: definePropType<SearchField[]>(Array),
    default: () => [],
  },
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
  simpleFields: {
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
})

export const nFilterEmits = {
  'update:simpleFields': (fields: FieldFilter[]) => isArray(fields),
  'update:filter': (_filter: Nillable<Filter>) => true,
  'update:filters': (filters: Filter[]) => isArray(filters),
  saveFilter: (val: Filter) => !!val,
  updateFilter: (val: Filter) => !!val,
  deleteFilter: (val: Filter) => !!val,
}

export type NFilterProps = ExtractPropTypes<typeof nFilterProps>
export type NFilterEmits = typeof nFilterEmits
export type NFilterInstance = InstanceType<typeof NFilter>
