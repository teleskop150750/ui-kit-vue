import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterList } from '../types'
import type NFilterManagerFormCreateFilterFieldList from './NFilterManagerFormCreateFilterFieldList.vue'

export const nFilterManagerFormCreateFilterFieldListProps = buildProps({
  field: {
    type: definePropType<FieldFilterList>(Object),
    required: true,
  },
} as const)

export const nFilterManagerFormCreateFilterFieldListEmits = {
  updateValue: (_val: FieldFilterList['value']) => true,
}

export type NFilterManagerFormCreateFilterFieldListProps = ExtractPropTypes<
  typeof nFilterManagerFormCreateFilterFieldListProps
>
export type NFilterManagerFormCreateFilterFieldListEmits = typeof nFilterManagerFormCreateFilterFieldListEmits
export type NFilterManagerFormCreateFilterFieldListInstance = InstanceType<
  typeof NFilterManagerFormCreateFilterFieldList
>
