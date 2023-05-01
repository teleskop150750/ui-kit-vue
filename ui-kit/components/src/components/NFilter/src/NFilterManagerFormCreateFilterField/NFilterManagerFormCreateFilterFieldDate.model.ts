import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterDate } from '../types'
import type NFilterManagerFormCreateFilterFieldDate from './NFilterManagerFormCreateFilterFieldDate.vue'

export const filterManagerFormCreateFilterFieldDateProps = buildProps({
  field: {
    type: definePropType<FieldFilterDate>(Object),
    required: true,
  },
} as const)

export const filterManagerFormCreateFilterFieldDateEmits = {
  updateValue: (_val: FieldFilterDate['value']) => true,
} as const

export type NFilterManagerFormCreateFilterFieldDateProps = ExtractPropTypes<
  typeof filterManagerFormCreateFilterFieldDateProps
>
export type NFilterManagerFormCreateFilterFieldDateEmits = typeof filterManagerFormCreateFilterFieldDateEmits
export type NFilterManagerFormCreateFilterFieldDateInstance = InstanceType<
  typeof NFilterManagerFormCreateFilterFieldDate
>
