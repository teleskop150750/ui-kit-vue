import { ref } from 'vue'

import { FilterOperator } from '../../types'
import type { NFilterSimpleListPopperContentBodyStringProps } from '../filter-simple-list-item-popper-content-body-string.model'

export function useFieldString(props: NFilterSimpleListPopperContentBodyStringProps) {
  const likeValue = ref<string>('')
  const operation = ref(FilterOperator.LIKE)

  function setValues() {
    likeValue.value = ''
    operation.value = FilterOperator.LIKE

    if (props.field.value && FilterOperator.LIKE in props.field.value) {
      likeValue.value = props.field.value[FilterOperator.LIKE] || ''
    }
  }

  setValues()

  return {
    likeValue,
    operation,
    resetValues: setValues,
  }
}
