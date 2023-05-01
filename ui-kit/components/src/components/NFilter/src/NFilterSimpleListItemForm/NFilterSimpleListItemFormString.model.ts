import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterString } from '../types'
import type NFilterSimpleListItemFormString from './NFilterSimpleListItemFormString.vue'

export const filterSimpleListItemFormStringProps = buildProps({
  field: {
    type: definePropType<FieldFilterString>(Object),
    required: true,
  },
} as const)

export const filterSimpleListItemFormStringEmits = {
  updateValue: (_val: FieldFilterString['value']) => true,
} as const

export type NFilterSimpleListItemFormStringProps = ExtractPropTypes<typeof filterSimpleListItemFormStringProps>
export type NFilterSimpleListItemFormStringEmits = typeof filterSimpleListItemFormStringEmits
export type NFilterSimpleListItemFormStringInstance = InstanceType<typeof NFilterSimpleListItemFormString>
