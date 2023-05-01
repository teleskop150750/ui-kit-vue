import { type Arrayable, debugWarn } from '@nado/ui-kit-utils'

import type { NFormItemProp } from '../../../NFormItem'
import type { NFormContext, NFormItemContext } from '../tokens'
import { filterFields } from '../utils'

interface Result {
  addField: NFormContext['addField']
  removeField: NFormContext['removeField']
  findValidateFields(props: Arrayable<NFormItemProp>): NFormItemContext[]
}

export function useFormItemList(fields: NFormItemContext[]): Result {
  function addField(field: NFormItemContext) {
    fields.push(field)
  }

  function removeField(field: NFormItemContext) {
    if (field.prop) {
      fields.splice(fields.indexOf(field), 1)
    }
  }

  function findValidateFields(props: Arrayable<NFormItemProp>) {
    if (fields.length === 0) {
      return []
    }

    const filteredFields = filterFields(fields, props)

    if (filteredFields.length === 0) {
      debugWarn('NForm', 'please pass correct props!')

      return []
    }

    return filteredFields
  }

  return {
    addField,
    removeField,
    findValidateFields,
  }
}
