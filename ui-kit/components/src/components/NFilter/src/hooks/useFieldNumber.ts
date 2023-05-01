import type { Nillable } from '@nado/ui-kit-utils'
import { reactive, ref } from 'vue'

import type { NFilterSimpleListItemFormNumberProps } from '../NFilterSimpleListItemForm/NFilterSimpleListItemFormNumber.model'
import { type FilterNumberOperator, FilterNumberOperatorMap } from '../types'

export function useFieldNumber(props: NFilterSimpleListItemFormNumberProps) {
  const anyValue = true as const
  const filledValue = true as const
  const emptyValue = true as const
  const eqValue = ref<Nillable<number>>(undefined)
  const btwValue = reactive<{
    start: Nillable<number>
    end: Nillable<number>
  }>({
    start: undefined,
    end: undefined,
  })
  const gteValue = ref<Nillable<number>>(undefined)
  const lteValue = ref<Nillable<number>>(undefined)

  const operation = ref<FilterNumberOperator>(FilterNumberOperatorMap.ANY)

  const operations = [
    {
      value: 'ANY',
      label: 'Любое значение',
    },
    {
      value: 'FILLED',
      label: 'Значение указано',
    },
    {
      value: 'EMPTY',
      label: 'Значение не указано',
    },
    {
      value: 'EQ',
      label: 'Точное совпадение',
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
    operation.value = FilterNumberOperatorMap.ANY

    if (props.field.value) {
      if (FilterNumberOperatorMap.ANY in props.field.value) {
        operation.value = FilterNumberOperatorMap.ANY
      } else if (FilterNumberOperatorMap.FILLED in props.field.value) {
        operation.value = FilterNumberOperatorMap.FILLED
      } else if (FilterNumberOperatorMap.EMPTY in props.field.value) {
        operation.value = FilterNumberOperatorMap.EMPTY
      } else if (FilterNumberOperatorMap.EQ in props.field.value) {
        operation.value = FilterNumberOperatorMap.EQ
      } else if (FilterNumberOperatorMap.BTW in props.field.value) {
        operation.value = FilterNumberOperatorMap.BTW
      } else if (FilterNumberOperatorMap.GTE in props.field.value) {
        operation.value = FilterNumberOperatorMap.GTE
      } else if (FilterNumberOperatorMap.LTE in props.field.value) {
        operation.value = FilterNumberOperatorMap.LTE
      } else {
        operation.value = FilterNumberOperatorMap.ANY
      }
    }

    if (props.field.value && FilterNumberOperatorMap.EQ in props.field.value) {
      eqValue.value = props.field.value[FilterNumberOperatorMap.EQ] || undefined
    } else if (props.field.value && FilterNumberOperatorMap.BTW in props.field.value) {
      const val = props.field.value[FilterNumberOperatorMap.BTW] || { start: undefined, end: undefined }

      btwValue.start = val.start
      btwValue.end = val.end
    } else if (props.field.value && FilterNumberOperatorMap.GTE in props.field.value) {
      gteValue.value = props.field.value[FilterNumberOperatorMap.GTE] || undefined
    } else if (props.field.value && FilterNumberOperatorMap.LTE in props.field.value) {
      lteValue.value = props.field.value[FilterNumberOperatorMap.LTE] || undefined
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
