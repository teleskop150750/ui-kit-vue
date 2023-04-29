import { ref } from 'vue'

import type { NFilterSimpleListItemFormListProps } from '../NFilterSimpleListItemForm/filter-simple-list-item-form-list.model'
import { type FilterListOperator, FilterListOperatorMap } from '../types'

export function useFieldList(props: NFilterSimpleListItemFormListProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inValue = ref<Array<string | number | Record<string, any>>>([])
  const operation = ref<FilterListOperator>(FilterListOperatorMap.IN)

  function setValues() {
    inValue.value = []
    operation.value = FilterListOperatorMap.IN

    if (props.field.value && FilterListOperatorMap.IN in props.field.value) {
      inValue.value = props.field.value[FilterListOperatorMap.IN] || []
    }
  }

  setValues()

  return {
    inValue,
    operation,
    resetValues: setValues,
  }
}
