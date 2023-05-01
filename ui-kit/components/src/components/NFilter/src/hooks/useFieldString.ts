import { ref } from 'vue'

import type { NFilterSimpleListItemFormStringProps } from '../NFilterSimpleListItemForm/NFilterSimpleListItemFormString.model'
import { type FilterStringOperator, FilterStringOperatorMap } from '../types'

export function useFieldString(props: NFilterSimpleListItemFormStringProps) {
  const likeValue = ref<string>('')
  const operation = ref<FilterStringOperator>(FilterStringOperatorMap.LIKE)

  function setValues() {
    likeValue.value = ''
    operation.value = FilterStringOperatorMap.LIKE

    if (props.field.value && FilterStringOperatorMap.LIKE in props.field.value) {
      likeValue.value = props.field.value[FilterStringOperatorMap.LIKE] || ''
    }
  }

  setValues()

  return {
    likeValue,
    operation,
    resetValues: setValues,
  }
}
