import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterField } from '../types'
import type NFilterManagerFormCreateFilterField from './NFilterManagerFormCreateFilterField.vue'

export const nFilterManagerFormCreateFilterFieldProps = buildProps({
  field: {
    type: definePropType<FilterField>(Object),
    required: true,
  },
} as const)

export const nFilterManagerFormCreateFilterFieldEmits = {
  // 'update:selectedFields': (val: FilterField[]) => isArray(val),
}

export type NFilterManagerFormCreateFilterFieldProps = ExtractPropTypes<typeof nFilterManagerFormCreateFilterFieldProps>
export type NFilterManagerFormCreateFilterFieldEmits = typeof nFilterManagerFormCreateFilterFieldEmits
export type NFilterManagerFormCreateFilterFieldInstance = InstanceType<typeof NFilterManagerFormCreateFilterField>
