import type { Nillable } from '@nado/ui-kit-utils'
import { reactive, ref } from 'vue'

import { FilterOperator } from '../../types'
import type { NFilterSimpleListPopperContentBodyNumberProps } from '../filter-simple-list-item-popper-content-body-number.model'

export function useFieldNumber(props: NFilterSimpleListPopperContentBodyNumberProps) {
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

  const operation = ref<'ANY' | 'FILLED' | 'EMPTY' | 'EQ' | 'BTW' | 'GTE' | 'LTE'>(FilterOperator.ANY)

  const operations = [
    {
      value: 'ANY',
      label: 'ANY',
    },
    {
      value: 'FILLED',
      label: 'FILLED',
    },
    {
      value: 'EMPTY',
      label: 'EMPTY',
    },
    {
      value: 'EQ',
      label: 'EQ',
    },
    {
      value: 'BTW',
      label: 'BTW',
    },
    {
      value: 'GTE',
      label: 'GTE',
    },
    {
      value: 'LTE',
      label: 'LTE',
    },
  ]

  function setValues() {
    eqValue.value = undefined
    btwValue.start = undefined
    btwValue.end = undefined
    gteValue.value = undefined
    lteValue.value = undefined
    operation.value = FilterOperator.ANY

    if (props.field.value) {
      if (FilterOperator.ANY in props.field.value) {
        operation.value = FilterOperator.ANY
      } else if (FilterOperator.FILLED in props.field.value) {
        operation.value = FilterOperator.FILLED
      } else if (FilterOperator.EMPTY in props.field.value) {
        operation.value = FilterOperator.EMPTY
      } else if (FilterOperator.EQ in props.field.value) {
        operation.value = FilterOperator.EQ
      } else if (FilterOperator.BTW in props.field.value) {
        operation.value = FilterOperator.BTW
      } else if (FilterOperator.GTE in props.field.value) {
        operation.value = FilterOperator.GTE
      } else if (FilterOperator.LTE in props.field.value) {
        operation.value = FilterOperator.LTE
      } else {
        operation.value = FilterOperator.ANY
      }
    }

    if (props.field.value && FilterOperator.EQ in props.field.value) {
      eqValue.value = props.field.value[FilterOperator.EQ] || undefined
    } else if (props.field.value && FilterOperator.BTW in props.field.value) {
      const val = props.field.value[FilterOperator.BTW] || { start: undefined, end: undefined }

      btwValue.start = val.start
      btwValue.end = val.end
    } else if (props.field.value && FilterOperator.GTE in props.field.value) {
      gteValue.value = props.field.value[FilterOperator.GTE] || undefined
    } else if (props.field.value && FilterOperator.LTE in props.field.value) {
      lteValue.value = props.field.value[FilterOperator.LTE] || undefined
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
