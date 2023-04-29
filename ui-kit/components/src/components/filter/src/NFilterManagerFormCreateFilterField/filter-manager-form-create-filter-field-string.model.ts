import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterString } from '../types'
import type NFilterManagerFormCreateFilterFieldString from './NFilterManagerFormCreateFilterFieldString.vue'

export const nFilterManagerFormCreateFilterFieldStringProps = buildProps({
  field: {
    type: definePropType<FieldFilterString>(Object),
    required: true,
  },
} as const)

export const nFilterManagerFormCreateFilterFieldStringEmits = {
  updateValue: (_val: FieldFilterString['value']) => true,
}

export type NFilterManagerFormCreateFilterFieldStringProps = ExtractPropTypes<
  typeof nFilterManagerFormCreateFilterFieldStringProps
>
export type NFilterManagerFormCreateFilterFieldStringEmits = typeof nFilterManagerFormCreateFilterFieldStringEmits
export type NFilterManagerFormCreateFilterFieldStringInstance = InstanceType<
  typeof NFilterManagerFormCreateFilterFieldString
>
