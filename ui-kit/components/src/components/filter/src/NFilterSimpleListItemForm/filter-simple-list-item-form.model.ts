import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter } from '../types'
import type NFilterSimpleListItemForm from './NFilterSimpleListItemForm.vue'

export const filterSimpleListItemFormProps = buildProps({
  field: {
    type: definePropType<FieldFilter>(Object),
    required: true,
  },
} as const)

export const filterSimpleListItemFormEmits = {
  updateValue: (_val?: FieldFilter['value']) => true,
} as const

export type NFilterSimpleListItemFormProps = ExtractPropTypes<typeof filterSimpleListItemFormProps>
export type NFilterSimpleListItemFormEmits = typeof filterSimpleListItemFormEmits
export type NFilterSimpleListItemFormInstance = InstanceType<typeof NFilterSimpleListItemForm>
