import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter } from '../types'
import type NFilterManagerFormCreateFilterField from './NFilterManagerFormCreateFilterField.vue'

export const nFilterManagerFormCreateFilterFieldProps = buildProps({
  field: {
    type: definePropType<FieldFilter>(Object),
    required: true,
  },
} as const)

export const nFilterManagerFormCreateFilterFieldEmits = {
  delete: (val: FieldFilter) => !!val,
  updateValue: (_val: FieldFilter['value']) => true,
}

export type NFilterManagerFormCreateFilterFieldProps = ExtractPropTypes<typeof nFilterManagerFormCreateFilterFieldProps>
export type NFilterManagerFormCreateFilterFieldEmits = typeof nFilterManagerFormCreateFilterFieldEmits
export type NFilterManagerFormCreateFilterFieldInstance = InstanceType<typeof NFilterManagerFormCreateFilterField>
