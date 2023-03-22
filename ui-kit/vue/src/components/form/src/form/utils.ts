import { castArray } from '@ui/utils'
import type { Arrayable } from '@vueuse/core'

import type { NFormItemProp } from '../form-item/form-item.model'
import type { NFormItemContext } from '../tokens'

export function filterFields(fields: NFormItemContext[], fieldNames: Arrayable<NFormItemProp>) {
  const normalized = castArray(fieldNames)

  return normalized.length > 0 ? fields.filter((field) => field.prop && normalized.includes(field.prop)) : fields
}
