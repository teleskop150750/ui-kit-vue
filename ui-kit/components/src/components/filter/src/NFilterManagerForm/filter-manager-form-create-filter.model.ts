import { buildProps, definePropType, isBoolean } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter, Filter } from '../types'
import type NFilterManagerFormCreateFilter from './NFilterManagerFormCreateFilter.vue'

export const filterManagerFormCreateFilterProps = buildProps({
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
  visible: {
    type: Boolean,
    default: false,
  },
  visibleInForm: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
} as const)

export const filterManagerFormCreateFilterEmits = {
  'update:visible': (val: boolean) => isBoolean(val),
  save: (val: Filter) => !!val,
} as const

export type NFilterManagerFormCreateFilterProps = ExtractPropTypes<typeof filterManagerFormCreateFilterProps>
export type NFilterManagerFormCreateFilterEmits = typeof filterManagerFormCreateFilterEmits
export type NFilterManagerFormCreateFilterInstance = InstanceType<typeof NFilterManagerFormCreateFilter>
