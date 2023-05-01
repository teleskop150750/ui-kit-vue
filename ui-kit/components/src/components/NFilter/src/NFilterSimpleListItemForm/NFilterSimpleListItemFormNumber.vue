<script setup lang="ts">
import { isNil, type Nillable } from '@nado/ui-kit-utils'

import { NFormItem } from '../../../NFormItem'
import { NInput } from '../../../NInput'
import { NOption, NSelect } from '../../../NSelect'
import { useFieldNumber } from '../hooks'
import { assertFilterNumberBtwByOperation, FilterNumberOperatorMap } from '../types'
import {
  filterSimpleListItemFormNumberEmits,
  filterSimpleListItemFormNumberProps,
} from './NFilterSimpleListItemFormNumber.model'

const props = defineProps(filterSimpleListItemFormNumberProps)
const emit = defineEmits(filterSimpleListItemFormNumberEmits)
const { anyValue, filledValue, emptyValue, eqValue, btwValue, gteValue, lteValue, operation, operations, resetValues } =
  useFieldNumber(props)

function parseVal(payload: string) {
  return Number.parseFloat(payload)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleUpdateOperation(payload: any) {
  operation.value = payload

  switch (payload) {
    case FilterNumberOperatorMap.ANY: {
      emit('updateValue', { ANY: emptyValue })

      break
    }
    case FilterNumberOperatorMap.EMPTY: {
      emit('updateValue', { EMPTY: anyValue })

      break
    }
    case FilterNumberOperatorMap.FILLED: {
      emit('updateValue', { FILLED: filledValue })

      break
    }
    // no default
  }
}

function handleUpdateEq(payload: string) {
  if (payload === '') {
    eqValue.value = undefined
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  eqValue.value = val
  emit('updateValue', { EQ: val })
}

function handleUpdateGte(payload: string) {
  if (payload === '') {
    gteValue.value = undefined
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  gteValue.value = val
  emit('updateValue', { GTE: val })
}

function handleUpdateLte(payload: string) {
  if (payload === '') {
    lteValue.value = undefined
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  lteValue.value = val
  emit('updateValue', { LTE: val })
}

function handleUpdateBtwStart(payload: string) {
  if (!assertFilterNumberBtwByOperation(props.field, 'BTW')) {
    return
  }

  if (payload === '' && isNil(btwValue.end)) {
    btwValue.start = undefined
    emit('updateValue', undefined)

    return
  }

  let val: Nillable<number> = parseVal(payload)

  if (Number.isNaN(val)) {
    val = undefined
  }

  btwValue.start = val

  emit('updateValue', {
    BTW: {
      start: val,
      end: btwValue.end,
    },
  })
}

function handleUpdateBtwEnd(payload: string) {
  if (!assertFilterNumberBtwByOperation(props.field, 'BTW')) {
    return
  }

  if (payload === '' && isNil(btwValue.start)) {
    btwValue.end = undefined
    emit('updateValue', undefined)

    return
  }

  let val: Nillable<number> = parseVal(payload)

  if (Number.isNaN(val)) {
    val = undefined
  }

  btwValue.end = val

  emit('updateValue', {
    BTW: {
      start: btwValue.start,
      end: val,
    },
  })
}

defineExpose({
  resetValues,
})
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItemFormNumber',
}
</script>

<template>
  <NFormItem class="n-filter-simple-list-item-form__operation" label="Вариант">
    <NSelect
      :model-value="operation"
      placeholder="Select"
      :teleported="false"
      @update:model-value="handleUpdateOperation"
    >
      <NOption v-for="item in operations" :key="item.value" :label="item.label" :value="item.value" />
    </NSelect>
  </NFormItem>
  <NFormItem v-if="operation === 'EQ'" class="n-filter-simple-list-item-form__value" label="Значение">
    <NInput :model-value="eqValue" @update:model-value="handleUpdateEq" />
  </NFormItem>
  <NFormItem v-else-if="operation === 'GTE'" class="n-filter-simple-list-item-form__value" label="Значение">
    <NInput :model-value="gteValue" @update:model-value="handleUpdateGte" />
  </NFormItem>
  <NFormItem v-else-if="operation === 'LTE'" class="n-filter-simple-list-item-form__value" label="Значение">
    <NInput :model-value="lteValue" @update:model-value="handleUpdateLte" />
  </NFormItem>
  <div v-else-if="operation === 'BTW'" class="n-filter-simple-list-item-form__value-between">
    <NFormItem label="Старт">
      <NInput :model-value="btwValue.start" @update:model-value="handleUpdateBtwStart" />
    </NFormItem>
    <NFormItem label="Конец">
      <NInput :model-value="btwValue.end" @update:model-value="handleUpdateBtwEnd" />
    </NFormItem>
  </div>
</template>
