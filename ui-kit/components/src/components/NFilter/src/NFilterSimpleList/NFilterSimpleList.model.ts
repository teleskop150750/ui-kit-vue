import { buildProps, definePropType, isObject, type Nillable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter, Filter, FilterNotSaved } from '../types'
import type NFilterSimpleList from './NFilterSimpleList.vue'

export const filterSimpleListProps = buildProps({
  filter: {
    type: definePropType<Nillable<Filter>>(Object),
    default: undefined,
  },
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
} as const)

export const filterSimpleListEmits = {
  saveFilter: (field: FilterNotSaved) => isObject(field),
  updateFilter: (field: Filter) => isObject(field),
} as const

export type NFilterSimpleListProps = ExtractPropTypes<typeof filterSimpleListProps>
export type NFilterSimpleListEmits = typeof filterSimpleListEmits
export type NFilterSimpleListInstance = InstanceType<typeof NFilterSimpleList>
