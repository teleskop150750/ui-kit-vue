import { buildProps, definePropType, isObject, type Nillable } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter, Filter, FilterNotSaved } from '../types'
import type NFilterSimpleList from './NFilterSimpleList.vue'

export const nFilterSimpleListProps = buildProps({
  filter: {
    type: definePropType<Nillable<Filter>>(Object),
    default: undefined,
  },
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
})

export const nFilterFilterListEmits = {
  saveFilter: (field: FilterNotSaved) => isObject(field),
  updateFilter: (field: Filter) => isObject(field),
}

export type NFilterSimpleListProps = ExtractPropTypes<typeof nFilterSimpleListProps>
export type NFilterFilterListEmits = typeof nFilterFilterListEmits
export type NFilterSimpleListInstance = InstanceType<typeof NFilterSimpleList>
