import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type { FieldFilter } from '../types'
import type NFilterSimpleListButtonSave from './NFilterSimpleListButtonSave.vue'

export const nFilterSimpleListButtonSaveProps = buildProps({
  fields: {
    type: definePropType<FieldFilter[]>(Array),
    default: () => [],
  },
})

export const nFilterFilterListButtonSaveEmits = {}

export type NFilterSimpleListButtonSaveProps = ExtractPropTypes<typeof nFilterSimpleListButtonSaveProps>
export type NFilterFilterListButtonSaveEmits = typeof nFilterFilterListButtonSaveEmits
export type NFilterSimpleListButtonSaveInstance = InstanceType<typeof NFilterSimpleListButtonSave>
