import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterFieldList } from '../types'
import type NFilterSimpleListItemPopperContentBodyList from './NFilterSimpleListItemPopperContentBodyList.vue'

export const nFilterSimpleListPopperContentBodyListProps = buildProps({
  field: {
    type: definePropType<FilterFieldList>(Object),
    default: () => [],
  },
})

export const nFilterSimpleListPopperContentBodyListEmits = {
  updateValue: (_val: FilterFieldList['value']) => true,
}

export type NFilterSimpleListPopperContentBodyListProps = ExtractPropTypes<
  typeof nFilterSimpleListPopperContentBodyListProps
>
export type NFilterSimpleListPopperContentBodyListEmits = typeof nFilterSimpleListPopperContentBodyListEmits
export type NFilterSimpleListItemPopperContentBodyListInstance = InstanceType<
  typeof NFilterSimpleListItemPopperContentBodyList
>
