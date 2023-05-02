<script setup lang="ts">
import { isNil } from '@nado/ui-kit-utils'

import { NFormItem } from '../../../NForm'
import { NInput } from '../../../NInput'
import { NOption, NSelect } from '../../../NSelect'
import { useFieldDate } from '../hooks'
import { assertFilterDateBtwByOperation, FilterDateOperatorMap } from '../types'
import {
  filterSimpleListItemFormDateEmits,
  filterSimpleListItemFormDateProps,
} from './NFilterSimpleListItemFormDate.model'

const props = defineProps(filterSimpleListItemFormDateProps)
const emit = defineEmits(filterSimpleListItemFormDateEmits)

const { anyValue, filledValue, emptyValue, eqValue, btwValue, gteValue, lteValue, operation, operations, resetValues } =
  useFieldDate(props)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleUpdateOperation(payload: any) {
  operation.value = payload

  switch (payload) {
    case FilterDateOperatorMap.ANY: {
      emit('updateValue', { ANY: emptyValue })

      break
    }
    case FilterDateOperatorMap.EMPTY: {
      emit('updateValue', { EMPTY: anyValue })

      break
    }
    case FilterDateOperatorMap.FILLED: {
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

  eqValue.value = payload
  emit('updateValue', { EQ: payload })
}

function handleUpdateGte(payload: string) {
  if (payload === '') {
    gteValue.value = undefined
    emit('updateValue', undefined)

    return
  }

  gteValue.value = payload
  emit('updateValue', { GTE: payload })
}

function handleUpdateLte(payload: string) {
  if (payload === '') {
    lteValue.value = undefined
    emit('updateValue', undefined)

    return
  }

  lteValue.value = payload
  emit('updateValue', { LTE: payload })
}

function handleUpdateBtwStart(payload: string) {
  if (!assertFilterDateBtwByOperation(props.field, 'BTW')) {
    return
  }

  if (payload === '' && isNil(btwValue.end)) {
    btwValue.start = undefined
    emit('updateValue', undefined)

    return
  }

  btwValue.start = payload

  emit('updateValue', {
    BTW: {
      start: payload,
      end: btwValue.end,
    },
  })
}

function handleUpdateBtwEnd(payload: string) {
  if (!assertFilterDateBtwByOperation(props.field, 'BTW')) {
    return
  }

  if (payload === '' && isNil(btwValue.start)) {
    btwValue.end = undefined
    emit('updateValue', undefined)

    return
  }

  btwValue.end = payload

  emit('updateValue', {
    BTW: {
      start: btwValue.start,
      end: payload,
    },
  })
}

defineExpose({
  resetValues,
})
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItemFormDate',
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
    <NInput :model-value="eqValue" type="date" @update:model-value="handleUpdateEq" />
  </NFormItem>
  <NFormItem v-else-if="operation === 'GTE'" class="n-filter-simple-list-item-form__value" label="Значение">
    <NInput :model-value="gteValue" type="date" @update:model-value="handleUpdateGte" />
  </NFormItem>
  <NFormItem v-else-if="operation === 'LTE'" class="n-filter-simple-list-item-form__value" label="Значение">
    <NInput :model-value="lteValue" type="date" @update:model-value="handleUpdateLte" />
  </NFormItem>
  <div v-else-if="operation === 'BTW'" class="n-filter-simple-list-item-form__value-between">
    <NFormItem label="Старт">
      <NInput :model-value="btwValue.start" type="date" @update:model-value="handleUpdateBtwStart" />
    </NFormItem>
    <NFormItem label="Конец">
      <NInput :model-value="btwValue.end" type="date" @update:model-value="handleUpdateBtwEnd" />
    </NFormItem>
  </div>
</template>
