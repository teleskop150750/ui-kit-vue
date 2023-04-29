import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterDate } from '../types'
import type NFilterSimpleListItemFormDate from './NFilterSimpleListItemFormDate.vue'

export const filterSimpleListItemFormDateProps = buildProps({
  field: {
    type: definePropType<FieldFilterDate>(Object),
    required: true,
  },
} as const)

export const filterSimpleListItemFormDateEmits = {
  updateValue: (_val: FieldFilterDate['value']) => true,
} as const

export type NFilterSimpleListItemFormDateProps = ExtractPropTypes<typeof filterSimpleListItemFormDateProps>
export type NFilterSimpleListItemFormDateEmits = typeof filterSimpleListItemFormDateEmits
export type NFilterSimpleListItemFormDateInstance = InstanceType<typeof NFilterSimpleListItemFormDate>
