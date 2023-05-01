import type { Nillable } from '@nado/ui-kit-utils'
import { reactive, ref } from 'vue'

import type { NFilterSimpleListItemFormDateProps } from '../NFilterSimpleListItemForm/NFilterSimpleListItemFormDate.model'
import { type FilterDateOperator, FilterDateOperatorMap } from '../types'

export function useFieldDate(props: NFilterSimpleListItemFormDateProps) {
  const anyValue = true as const
  const filledValue = true as const
  const emptyValue = true as const
  const eqValue = ref<Nillable<string>>(undefined)
  const btwValue = reactive<{
    start: Nillable<string>
    end: Nillable<string>
  }>({
    start: undefined,
    end: undefined,
  })
  const gteValue = ref<Nillable<string>>(undefined)
  const lteValue = ref<Nillable<string>>(undefined)

  const operation = ref<FilterDateOperator>(FilterDateOperatorMap.ANY)

  const operations = [
    {
      value: 'ANY',
      label: 'Любая дата',
    },
    {
      value: 'FILLED',
      label: 'Дата указана',
    },
    {
      value: 'EMPTY',
      label: 'Дата не указана',
    },
    {
      value: 'EQ',
      label: 'Точная дата',
    },
    {
      value: 'BTW',
      label: 'Диапазон',
    },
    {
      value: 'GTE',
      label: 'Больше',
    },
    {
      value: 'LTE',
      label: 'Меньше',
    },
  ] as const

  function setValues() {
    eqValue.value = undefined
    btwValue.start = undefined
    btwValue.end = undefined
    gteValue.value = undefined
    lteValue.value = undefined
    operation.value = FilterDateOperatorMap.ANY

    if (props.field.value) {
      if (FilterDateOperatorMap.ANY in props.field.value) {
        operation.value = FilterDateOperatorMap.ANY
      } else if (FilterDateOperatorMap.FILLED in props.field.value) {
        operation.value = FilterDateOperatorMap.FILLED
      } else if (FilterDateOperatorMap.EMPTY in props.field.value) {
        operation.value = FilterDateOperatorMap.EMPTY
      } else if (FilterDateOperatorMap.EQ in props.field.value) {
        operation.value = FilterDateOperatorMap.EQ
      } else if (FilterDateOperatorMap.BTW in props.field.value) {
        operation.value = FilterDateOperatorMap.BTW
      } else if (FilterDateOperatorMap.GTE in props.field.value) {
        operation.value = FilterDateOperatorMap.GTE
      } else if (FilterDateOperatorMap.LTE in props.field.value) {
        operation.value = FilterDateOperatorMap.LTE
      } else {
        operation.value = FilterDateOperatorMap.ANY
      }
    }

    if (props.field.value && FilterDateOperatorMap.EQ in props.field.value) {
      eqValue.value = props.field.value[FilterDateOperatorMap.EQ] || undefined
    } else if (props.field.value && FilterDateOperatorMap.BTW in props.field.value) {
      const val = props.field.value[FilterDateOperatorMap.BTW] || { start: undefined, end: undefined }

      btwValue.start = val.start
      btwValue.end = val.end
    } else if (props.field.value && FilterDateOperatorMap.GTE in props.field.value) {
      gteValue.value = props.field.value[FilterDateOperatorMap.GTE] || undefined
    } else if (props.field.value && FilterDateOperatorMap.LTE in props.field.value) {
      lteValue.value = props.field.value[FilterDateOperatorMap.LTE] || undefined
    }
  }
  setValues()

  return {
    anyValue,
    filledValue,
    emptyValue,
    eqValue,
    btwValue,
    gteValue,
    lteValue,
    operation,
    operations,
    resetValues: setValues,
  }
}
