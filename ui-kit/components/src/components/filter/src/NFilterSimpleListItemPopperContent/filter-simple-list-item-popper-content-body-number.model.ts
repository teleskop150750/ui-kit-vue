import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterFieldNumber } from '../types'
import type NFilterSimpleListItemPopperContentBodyNumber from './NFilterSimpleListItemPopperContentBodyNumber.vue'

export const nFilterSimpleListPopperContentBodyNumberProps = buildProps({
  field: {
    type: definePropType<FilterFieldNumber>(Object),
    default: () => [],
  },
})

export const nFilterSimpleListPopperContentBodyNumberEmits = {
  updateValue: (_val: FilterFieldNumber['value']) => true,
}

export type NFilterSimpleListPopperContentBodyNumberProps = ExtractPropTypes<
  typeof nFilterSimpleListPopperContentBodyNumberProps
>
export type NFilterSimpleListPopperContentBodyNumberEmits = typeof nFilterSimpleListPopperContentBodyNumberEmits
export type NFilterSimpleListItemPopperContentBodyNumberInstance = InstanceType<
  typeof NFilterSimpleListItemPopperContentBodyNumber
>
