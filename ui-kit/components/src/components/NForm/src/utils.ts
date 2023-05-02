import { type Arrayable, castArray } from '@nado/ui-kit-utils'

import type { NFormItemProp } from './NFormItem/NFormItem.model'
import type { NFormItemContext } from './NFormItem/tokens'

export function filterFields(fields: NFormItemContext[], fieldNames: Arrayable<NFormItemProp>) {
  const normalized = castArray(fieldNames)

  return normalized.length > 0 ? fields.filter((field) => field.prop && normalized.includes(field.prop)) : fields
}
