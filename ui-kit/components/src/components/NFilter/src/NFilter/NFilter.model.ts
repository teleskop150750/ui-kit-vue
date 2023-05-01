import { buildProps, definePropType, isArray, isString, type Nillable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter, Filter, SearchField } from '../types'
import type NFilter from './NFilter.vue'

export const filterProps = buildProps({
  search: {
    type: definePropType<string>(String),
    default: '',
  },
  searchFields: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
  searchFieldsOptions: {
    type: definePropType<SearchField[]>(Array),
    default: () => [],
  },
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

export const filterEmits = {
  'update:search': (search: string) => isString(search),
  'update:searchFields': (searchFields: string[]) => isArray(searchFields),
  'update:filter': (_filter: Nillable<Filter>) => true,
  'update:filters': (filters: Filter[]) => isArray(filters),
  saveFilter: (val: Filter) => !!val,
  updateFilter: (val: Filter) => !!val,
  deleteFilter: (val: Filter) => !!val,
} as const

export type NFilterProps = ExtractPropTypes<typeof filterProps>
export type NFilterEmits = typeof filterEmits
export type NFilterInstance = InstanceType<typeof NFilter>
