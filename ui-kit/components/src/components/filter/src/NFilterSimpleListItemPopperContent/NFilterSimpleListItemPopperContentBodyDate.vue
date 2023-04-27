<script setup lang="ts">
import { watch } from 'vue'

import { NInput } from '../../../input'
import { NOption, NSelect } from '../../../select'
import { FilterOperator } from '../types'
import {
  nFilterSimpleListPopperContentBodyDateEmits,
  nFilterSimpleListPopperContentBodyDateProps,
} from './filter-simple-list-item-popper-content-body-date.model'
import { useFieldDate } from './hooks'

const props = defineProps(nFilterSimpleListPopperContentBodyDateProps)
const emit = defineEmits(nFilterSimpleListPopperContentBodyDateEmits)
const { anyValue, filledValue, emptyValue, eqValue, btwValue, gteValue, lteValue, operation, operations, resetValues } =
  useFieldDate(props)

function handleUpdateEq(payload: string) {
  if (payload === '') {
    eqValue.value = undefined
    emit('updateValue', undefined)

    return
  }

  eqValue.value = payload
  emit('updateValue', payload ? { EQ: payload } : undefined)
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
  if (payload === '') {
    btwValue.start = undefined
    emit('updateValue', undefined)

    return
  }

  btwValue.start = payload
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

  btwValue.end = payload
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
  operation,
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
  name: 'NFilterSimpleListItemPopperContentBodyDate',
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
      type="date"
      @update:model-value="handleUpdateEq"
    />
    <NInput
      v-if="operation === 'GTE'"
      class="n-filter-simple-list-item-popper-content__select-value"
      :model-value="gteValue"
      type="date"
      @update:model-value="handleUpdateGte"
    />
    <NInput
      v-if="operation === 'LTE'"
      class="n-filter-simple-list-item-popper-content__select-value"
      :model-value="lteValue"
      type="date"
      @update:model-value="handleUpdateLte"
    />

    <div v-if="operation === 'BTW'" class="n-filter-simple-list-item-popper-content__select-between">
      <NInput
        class="n-filter-simple-list-item-popper-content__select-value"
        :model-value="btwValue.start"
        type="date"
        @update:model-value="handleUpdateBtwStart"
      />

      <NInput
        class="n-filter-simple-list-item-popper-content__select-value"
        :model-value="btwValue.end"
        type="date"
        @update:model-value="handleUpdateBtwEnd"
      />
    </div>
  </div>
</template>
