import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterList } from '../types'
import type NFilterManagerFormCreateFilterFieldList from './NFilterManagerFormCreateFilterFieldList.vue'

export const filterManagerFormCreateFilterFieldListProps = buildProps({
  field: {
    type: definePropType<FieldFilterList>(Object),
    required: true,
  },
} as const)

export const filterManagerFormCreateFilterFieldListEmits = {
  updateValue: (_val: FieldFilterList['value']) => true,
} as const

export type NFilterManagerFormCreateFilterFieldListProps = ExtractPropTypes<
  typeof filterManagerFormCreateFilterFieldListProps
>
export type NFilterManagerFormCreateFilterFieldListEmits = typeof filterManagerFormCreateFilterFieldListEmits
export type NFilterManagerFormCreateFilterFieldListInstance = InstanceType<
  typeof NFilterManagerFormCreateFilterFieldList
>
