import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterDate } from '../types'
import type NFilterManagerFormCreateFilterFieldDate from './NFilterManagerFormCreateFilterFieldDate.vue'

export const nFilterManagerFormCreateFilterFieldDateProps = buildProps({
  field: {
    type: definePropType<FieldFilterDate>(Object),
    required: true,
  },
} as const)

export const nFilterManagerFormCreateFilterFieldDateEmits = {
  updateValue: (_val: FieldFilterDate['value']) => true,
}

export type NFilterManagerFormCreateFilterFieldDateProps = ExtractPropTypes<
  typeof nFilterManagerFormCreateFilterFieldDateProps
>
export type NFilterManagerFormCreateFilterFieldDateEmits = typeof nFilterManagerFormCreateFilterFieldDateEmits
export type NFilterManagerFormCreateFilterFieldDateInstance = InstanceType<
  typeof NFilterManagerFormCreateFilterFieldDate
>
