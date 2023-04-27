import { computed, ref } from 'vue'

import { FilterOperator } from '../../types'
import type { NFilterSimpleListPopperContentBodyListProps } from '../filter-simple-list-item-popper-content-body-list.model'

export function useFieldList(props: NFilterSimpleListPopperContentBodyListProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inValue = ref<Array<string | number | Record<string, any>>>([])
  const operation = ref(FilterOperator.IN)
  const options = computed(() => props.field.options || [])

  function setValues() {
    inValue.value = []
    operation.value = FilterOperator.IN

    if (props.field.value && FilterOperator.IN in props.field.value) {
      inValue.value = props.field.value[FilterOperator.IN] || []
    }
  }

  setValues()

  return {
    inValue,
    options,
    operation,
    resetValues: setValues,
  }
}
