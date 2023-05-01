import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterNumber } from '../types'
import type NFilterSimpleListItemFormNumber from './NFilterSimpleListItemFormNumber.vue'

export const filterSimpleListItemFormNumberProps = buildProps({
  field: {
    type: definePropType<FieldFilterNumber>(Object),
    required: true,
  },
} as const)

export const filterSimpleListItemFormNumberEmits = {
  updateValue: (_val: FieldFilterNumber['value']) => true,
} as const

export type NFilterSimpleListItemFormNumberProps = ExtractPropTypes<typeof filterSimpleListItemFormNumberProps>
export type NFilterSimpleListItemFormNumberEmits = typeof filterSimpleListItemFormNumberEmits
export type NFilterSimpleListItemFormNumberInstance = InstanceType<typeof NFilterSimpleListItemFormNumber>
