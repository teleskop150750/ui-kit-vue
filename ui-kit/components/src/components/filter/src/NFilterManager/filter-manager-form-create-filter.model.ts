import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FilterField } from '../types'
import type NFilterManagerFormCreateFilter from './NFilterManagerFormCreateFilter.vue'

export const nFilterManagerFormCreateFilterProps = buildProps({
  fields: {
    type: definePropType<FilterField[]>(Array),
    default: () => [],
  },
})

export const nFilterManagerFormCreateFilterEmits = {
  // 'update:selectedFields': (val: FilterField[]) => isArray(val),
}

export type NFilterManagerFormCreateFilterProps = ExtractPropTypes<typeof nFilterManagerFormCreateFilterProps>
export type NFilterManagerFormCreateFilterEmits = typeof nFilterManagerFormCreateFilterEmits
export type NFilterManagerFormCreateFilterInstance = InstanceType<typeof NFilterManagerFormCreateFilter>
