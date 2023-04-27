import { buildProps, definePropType, isArray } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterField, SearchField } from '../types'
import type NFilter from './NFilter.vue'

export const nFilterProps = buildProps({
  searchFields: {
    type: definePropType<SearchField[]>(Array),
    default: () => [],
  },
  fields: {
    type: definePropType<FilterField[]>(Array),
    default: () => [],
  },
  simpleFields: {
    type: definePropType<FilterField[]>(Array),
    default: () => [],
  },
})

export const nFilterEmits = {
  'update:simpleFields': (fields: FilterField[]) => isArray(fields),
}

export type NFilterProps = ExtractPropTypes<typeof nFilterProps>
export type NFilterEmits = typeof nFilterEmits
export type NFilterInstance = InstanceType<typeof NFilter>
