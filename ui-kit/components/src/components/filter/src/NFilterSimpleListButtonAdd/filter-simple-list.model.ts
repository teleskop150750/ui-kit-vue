import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter } from '../types'
import type NFilterSimpleListButtonAdd from './NFilterSimpleListButtonAdd.vue'

export const nFilterSimpleListButtonAddProps = buildProps({
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
  filterFields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
})

export const nFilterSimpleListButtonAddEmits = {
  add: (field: FieldFilter) => !!field,
}

export type NFilterSimpleListButtonAddProps = ExtractPropTypes<typeof nFilterSimpleListButtonAddProps>
export type NFilterSimpleListButtonAddEmits = typeof nFilterSimpleListButtonAddEmits
export type NFilterSimpleListButtonAddInstance = InstanceType<typeof NFilterSimpleListButtonAdd>
