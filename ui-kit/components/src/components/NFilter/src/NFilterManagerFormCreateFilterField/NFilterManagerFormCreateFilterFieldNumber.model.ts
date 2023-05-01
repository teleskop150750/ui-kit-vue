import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilterNumber } from '../types'
import type NFilterManagerFormCreateFilterFieldNumber from './NFilterManagerFormCreateFilterFieldNumber.vue'

export const filterManagerFormCreateFilterFieldNumberProps = buildProps({
  field: {
    type: definePropType<FieldFilterNumber>(Object),
    required: true,
  },
} as const)

export const filterManagerFormCreateFilterFieldNumberEmits = {
  updateValue: (_val: FieldFilterNumber['value']) => true,
} as const

export type NFilterManagerFormCreateFilterFieldNumberProps = ExtractPropTypes<
  typeof filterManagerFormCreateFilterFieldNumberProps
>
export type NFilterManagerFormCreateFilterFieldNumberEmits = typeof filterManagerFormCreateFilterFieldNumberEmits
export type NFilterManagerFormCreateFilterFieldNumberInstance = InstanceType<
  typeof NFilterManagerFormCreateFilterFieldNumber
>
