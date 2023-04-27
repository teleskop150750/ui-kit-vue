<script setup lang="ts">
import { watch } from 'vue'

import { NInput } from '../../../input'
import { NOption, NSelect } from '../../../select'
import { FilterOperator } from '../types'
import {
  nFilterSimpleListPopperContentBodyNumberEmits,
  nFilterSimpleListPopperContentBodyNumberProps,
} from './filter-simple-list-item-popper-content-body-number.model'
import { useFieldNumber } from './hooks'

const props = defineProps(nFilterSimpleListPopperContentBodyNumberProps)
const emit = defineEmits(nFilterSimpleListPopperContentBodyNumberEmits)
const { anyValue, filledValue, emptyValue, eqValue, btwValue, gteValue, lteValue, operation, operations, resetValues } =
  useFieldNumber(props)

function parseVal(payload: string) {
  return Number.parseFloat(payload)
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
  emit('updateValue', val ? { EQ: val } : undefined)
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
  if (payload === '') {
    btwValue.start = undefined
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  btwValue.start = val
  emit(
    'updateValue',
    btwValue.start && btwValue.end
      ? {
          BTW: {
            start: btwValue.start,
            end: btwValue.end,
          },
        }
      : undefined,
  )
}

function handleUpdateBtwEnd(payload: string) {
  if (payload === '') {
    btwValue.end = undefined
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  btwValue.end = val
  emit(
    'updateValue',
    btwValue.start && btwValue.end
      ? {
          BTW: {
            start: btwValue.start,
            end: btwValue.end,
          },
        }
      : undefined,
  )
}

watch(
  () => operation.value,
  (val) => {
    switch (val) {
      case FilterOperator.ANY: {
        emit('updateValue', { ANY: emptyValue })

        break
      }
      case FilterOperator.EMPTY: {
        emit('updateValue', { EMPTY: anyValue })

        break
      }
      case FilterOperator.FILLED: {
        emit('updateValue', { FILLED: filledValue })

        break
      }
      // no default
    }
  },
  {
    immediate: true,
  },
)

defineExpose({
  resetValues,
})
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItemPopperContentBodyNumber',
}
</script>

<template>
  <div class="n-filter-simple-list-item-popper-content__body-inner">
    <NSelect
      v-model="operation"
      class="n-filter-simple-list-item-popper-content__select-operation"
      placeholder="Select"
      :teleported="false"
    >
      <NOption v-for="item in operations" :key="item.value" :label="item.label" :value="item.value" />
    </NSelect>
    <NInput
      v-if="operation === 'EQ'"
      class="n-filter-simple-list-item-popper-content__select-value"
      :model-value="eqValue"
      @update:model-value="handleUpdateEq"
    />
    <NInput
      v-if="operation === 'GTE'"
      class="n-filter-simple-list-item-popper-content__select-value"
      :model-value="gteValue"
      @update:model-value="handleUpdateGte"
    />
    <NInput
      v-if="operation === 'LTE'"
      class="n-filter-simple-list-item-popper-content__select-value"
      :model-value="lteValue"
      @update:model-value="handleUpdateLte"
    />

    <div v-if="operation === 'BTW'" class="n-filter-simple-list-item-popper-content__select-between">
      <NInput
        class="n-filter-simple-list-item-popper-content__select-value"
        :model-value="btwValue.start"
        @update:model-value="handleUpdateBtwStart"
      />

      <NInput
        class="n-filter-simple-list-item-popper-content__select-value"
        :model-value="btwValue.end"
        @update:model-value="handleUpdateBtwEnd"
      />
    </div>
  </div>
</template>
