import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterString } from '../types'
import type NFilterManagerFormCreateFilterFieldString from './NFilterManagerFormCreateFilterFieldString.vue'

export const filterManagerFormCreateFilterFieldStringProps = buildProps({
  field: {
    type: definePropType<FieldFilterString>(Object),
    required: true,
  },
} as const)

export const filterManagerFormCreateFilterFieldStringEmits = {
  updateValue: (_val: FieldFilterString['value']) => true,
} as const

export type NFilterManagerFormCreateFilterFieldStringProps = ExtractPropTypes<
  typeof filterManagerFormCreateFilterFieldStringProps
>
export type NFilterManagerFormCreateFilterFieldStringEmits = typeof filterManagerFormCreateFilterFieldStringEmits
export type NFilterManagerFormCreateFilterFieldStringInstance = InstanceType<
  typeof NFilterManagerFormCreateFilterFieldString
>
