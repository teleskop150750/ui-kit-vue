import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterField } from '../types'
import type NFilterSimpleListButtonAdd from './NFilterSimpleListButtonAdd.vue'

export const nFilterSimpleListButtonAddProps = buildProps({
  fields: {
    type: definePropType<FilterField[]>(Array),
    default: () => [],
  },
  selectedFields: {
    type: definePropType<FilterField[]>(Array),
    default: () => [],
  },
})

export const nFilterSimpleListButtonAddEmits = {
  add: (field: FilterField) => !!field,
}

export type NFilterSimpleListButtonAddProps = ExtractPropTypes<typeof nFilterSimpleListButtonAddProps>
export type NFilterSimpleListButtonAddEmits = typeof nFilterSimpleListButtonAddEmits
export type NFilterSimpleListButtonAddInstance = InstanceType<typeof NFilterSimpleListButtonAdd>
