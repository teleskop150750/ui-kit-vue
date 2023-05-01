import { buildProps, definePropType, isObject } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter } from '../types'
import type NFilterSimpleListItem from './NFilterSimpleListItem.vue'

export const filterSimpleListItemProps = buildProps({
  field: {
    type: definePropType<FieldFilter>(Object),
    default: () => [],
  },
} as const)

export const filterFilterListItemEmits = {
  delete: (field: FieldFilter) => isObject(field),
  update: (field: FieldFilter) => isObject(field),
} as const

export type NFilterSimpleListItemProps = ExtractPropTypes<typeof filterSimpleListItemProps>
export type NFilterFilterListItemEmits = typeof filterFilterListItemEmits
export type NFilterSimpleListItemInstance = InstanceType<typeof NFilterSimpleListItem>
