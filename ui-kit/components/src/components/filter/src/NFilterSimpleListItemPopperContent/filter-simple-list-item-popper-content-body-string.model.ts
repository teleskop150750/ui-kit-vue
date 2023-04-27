import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterFieldString } from '../types'
import type NFilterSimpleListItemPopperContentBodyString from './NFilterSimpleListItemPopperContentBodyString.vue'

export const nFilterSimpleListPopperContentBodyStringProps = buildProps({
  field: {
    type: definePropType<FilterFieldString>(Object),
    default: () => [],
  },
})

export const nFilterSimpleListPopperContentBodyStringEmits = {
  updateValue: (_val: FilterFieldString['value']) => true,
}

export type NFilterSimpleListPopperContentBodyStringProps = ExtractPropTypes<
  typeof nFilterSimpleListPopperContentBodyStringProps
>
export type NFilterSimpleListPopperContentBodyStringEmits = typeof nFilterSimpleListPopperContentBodyStringEmits
export type NFilterSimpleListItemPopperContentBodyStringInstance = InstanceType<
  typeof NFilterSimpleListItemPopperContentBodyString
>
