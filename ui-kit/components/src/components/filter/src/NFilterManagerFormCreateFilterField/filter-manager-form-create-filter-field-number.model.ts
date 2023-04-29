import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterNumber } from '../types'
import type NFilterManagerFormCreateFilterFieldNumber from './NFilterManagerFormCreateFilterFieldNumber.vue'

export const nFilterManagerFormCreateFilterFieldNumberProps = buildProps({
  field: {
    type: definePropType<FieldFilterNumber>(Object),
    required: true,
  },
} as const)

export const nFilterManagerFormCreateFilterFieldNumberEmits = {
  updateValue: (_val: FieldFilterNumber['value']) => true,
}

export type NFilterManagerFormCreateFilterFieldNumberProps = ExtractPropTypes<
  typeof nFilterManagerFormCreateFilterFieldNumberProps
>
export type NFilterManagerFormCreateFilterFieldNumberEmits = typeof nFilterManagerFormCreateFilterFieldNumberEmits
export type NFilterManagerFormCreateFilterFieldNumberInstance = InstanceType<
  typeof NFilterManagerFormCreateFilterFieldNumber
>
