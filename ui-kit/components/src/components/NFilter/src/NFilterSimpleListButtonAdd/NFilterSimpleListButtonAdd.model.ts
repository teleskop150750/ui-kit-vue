import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter } from '../types'
import type NFilterSimpleListButtonAdd from './NFilterSimpleListButtonAdd.vue'

export const filterSimpleListButtonAddProps = buildProps({
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
  filterFields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
} as const)

export const filterSimpleListButtonAddEmits = {
  add: (field: FieldFilter) => !!field,
} as const

export type NFilterSimpleListButtonAddProps = ExtractPropTypes<typeof filterSimpleListButtonAddProps>
export type NFilterSimpleListButtonAddEmits = typeof filterSimpleListButtonAddEmits
export type NFilterSimpleListButtonAddInstance = InstanceType<typeof NFilterSimpleListButtonAdd>
