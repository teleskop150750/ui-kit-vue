import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { Filter, FilterField } from '../types'
import type NFilterSimpleListItemPopperContent from './NFilterSimpleListItemPopperContent.vue'

export const nFilterSimpleListPopperContentProps = buildProps({
  field: {
    type: definePropType<FilterField>(Object),
    default: () => [],
  },
})

export const nFilterSimpleListPopperContentEmits = {
  updateValue: (_val?: Filter) => true,
}

export type NFilterSimpleListPopperContentProps = ExtractPropTypes<typeof nFilterSimpleListPopperContentProps>
export type NFilterSimpleListPopperContentEmits = typeof nFilterSimpleListPopperContentEmits
export type NFilterSimpleListItemPopperContentInstance = InstanceType<typeof NFilterSimpleListItemPopperContent>
