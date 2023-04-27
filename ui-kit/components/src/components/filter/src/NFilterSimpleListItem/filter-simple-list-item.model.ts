import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterField } from '../types'
import type NFilterSimpleListItem from './NFilterSimpleListItem.vue'

export const nFilterSimpleListItemProps = buildProps({
  field: {
    type: definePropType<FilterField>(Object),
    default: () => [],
  },
})

export const nFilterFilterListItemEmits = {
  delete: (field: FilterField) => !!field,
  update: (_val: FilterField) => true,
}

export type NFilterSimpleListItemProps = ExtractPropTypes<typeof nFilterSimpleListItemProps>
export type NFilterFilterListItemEmits = typeof nFilterFilterListItemEmits
export type NFilterSimpleListItemInstance = InstanceType<typeof NFilterSimpleListItem>
