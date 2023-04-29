import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter } from '../types'
import type NFilterSimpleListItem from './NFilterSimpleListItem.vue'

export const nFilterSimpleListItemProps = buildProps({
  field: {
    type: definePropType<FieldFilter>(Object),
    default: () => [],
  },
})

export const nFilterFilterListItemEmits = {
  delete: (field: FieldFilter) => !!field,
  update: (_val: FieldFilter) => true,
}

export type NFilterSimpleListItemProps = ExtractPropTypes<typeof nFilterSimpleListItemProps>
export type NFilterFilterListItemEmits = typeof nFilterFilterListItemEmits
export type NFilterSimpleListItemInstance = InstanceType<typeof NFilterSimpleListItem>
