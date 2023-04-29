import { buildProps, definePropType, isArray } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter } from '../types'
import type NFilterSimpleList from './NFilterSimpleList.vue'

export const nFilterSimpleListProps = buildProps({
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
  selectedFields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
})

export const nFilterFilterListEmits = {
  'update:selectedFields': (val: FieldFilter[]) => isArray(val),
}

export type NFilterSimpleListProps = ExtractPropTypes<typeof nFilterSimpleListProps>
export type NFilterFilterListEmits = typeof nFilterFilterListEmits
export type NFilterSimpleListInstance = InstanceType<typeof NFilterSimpleList>
