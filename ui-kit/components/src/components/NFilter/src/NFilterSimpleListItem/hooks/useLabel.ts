import { isNil } from '@nado/ui-kit-utils'
import { computed } from 'vue'

// import { FilterOperator } from '../../constants'
import type { NFilterSimpleListItemProps } from '../NFilterSimpleListItem.model'

export function useLabel(props: NFilterSimpleListItemProps) {
  const valueLabel = computed(() => {
    if (isNil(props.field.value)) {
      return undefined
    }

    // if (FilterOperator.LIKE in props.field.value) {
    //   return props.field.value[FilterOperator.LIKE]
    // }

    // if ('' in props.field.value) {
    //   return props.field.value.LIKE
    // }

    return undefined
  })

  return {
    valueLabel,
  }
}
