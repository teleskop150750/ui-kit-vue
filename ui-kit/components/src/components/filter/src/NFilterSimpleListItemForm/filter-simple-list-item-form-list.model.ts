import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterList } from '../types'
import type NFilterSimpleListItemFormList from './NFilterSimpleListItemFormList.vue'

export const filterSimpleListItemFormListProps = buildProps({
  field: {
    type: definePropType<FieldFilterList>(Object),
    required: true,
  },
} as const)

export const filterSimpleListItemFormListEmits = {
  updateValue: (_val: FieldFilterList['value']) => true,
} as const

export type NFilterSimpleListItemFormListProps = ExtractPropTypes<typeof filterSimpleListItemFormListProps>
export type NFilterSimpleListItemFormListEmits = typeof filterSimpleListItemFormListEmits
export type NFilterSimpleListItemFormListInstance = InstanceType<typeof NFilterSimpleListItemFormList>
