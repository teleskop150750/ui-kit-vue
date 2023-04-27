import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterFieldDate } from '../types'
import type NFilterSimpleListItemPopperContentBodyDate from './NFilterSimpleListItemPopperContentBodyDate.vue'

export const nFilterSimpleListPopperContentBodyDateProps = buildProps({
  field: {
    type: definePropType<FilterFieldDate>(Object),
    default: () => [],
  },
})

export const nFilterSimpleListPopperContentBodyDateEmits = {
  updateValue: (_val: FilterFieldDate['value']) => true,
}

export type NFilterSimpleListPopperContentBodyDateProps = ExtractPropTypes<
  typeof nFilterSimpleListPopperContentBodyDateProps
>
export type NFilterSimpleListPopperContentBodyDateEmits = typeof nFilterSimpleListPopperContentBodyDateEmits
export type NFilterSimpleListItemPopperContentBodyDateInstance = InstanceType<
  typeof NFilterSimpleListItemPopperContentBodyDate
>
