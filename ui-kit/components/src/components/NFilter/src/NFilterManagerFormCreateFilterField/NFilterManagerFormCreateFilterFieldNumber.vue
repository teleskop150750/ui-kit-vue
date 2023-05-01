<script setup lang="ts">
import { isNil } from '@nado/ui-kit-utils'

import { NFormItem } from '../../../NFormItem'
import { NInput } from '../../../NInput'
import { NOption, NSelect } from '../../../NSelect'
import { useFieldNumber } from '../hooks'
import {
  assertFilterNumberBtwByOperation,
  assertFilterNumberEqByOperation,
  assertFilterNumberGteByOperation,
  assertFilterNumberLteByOperation,
  FilterNumberOperatorMap,
} from '../types'
import {
  filterManagerFormCreateFilterFieldNumberEmits,
  filterManagerFormCreateFilterFieldNumberProps,
} from './NFilterManagerFormCreateFilterFieldNumber.model'

const props = defineProps(filterManagerFormCreateFilterFieldNumberProps)
const emit = defineEmits(filterManagerFormCreateFilterFieldNumberEmits)

const { operation, operations } = useFieldNumber(props)

function parseVal(payload: string) {
  return Number.parseFloat(payload)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleUpdateOperation(payload: any) {
  operation.value = payload
  switch (payload) {
    case FilterNumberOperatorMap.ANY: {
      emit('updateValue', { ANY: payload })

      break
    }
    case FilterNumberOperatorMap.EMPTY: {
      emit('updateValue', { EMPTY: payload })

      break
    }
    case FilterNumberOperatorMap.FILLED: {
      emit('updateValue', { FILLED: payload })

      break
    }
    // no default
  }
}

function handleUpdateEq(payload: string) {
  if (payload === '') {
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  emit('updateValue', { EQ: val })
}

function handleUpdateGte(payload: string) {
  if (payload === '') {
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  emit('updateValue', { GTE: val })
}

function handleUpdateLte(payload: string) {
  if (payload === '') {
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  emit('updateValue', { LTE: val })
}

function handleUpdateBtwStart(payload: string) {
  if (!assertFilterNumberBtwByOperation(props.field, 'BTW')) {
    return
  }

  if (payload === '' && isNil(props.field.value?.BTW?.start)) {
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  emit('updateValue', {
    BTW: {
      start: val,
      end: props.field.value?.BTW?.end,
    },
  })
}

function handleUpdateBtwEnd(payload: string) {
  if (!assertFilterNumberBtwByOperation(props.field, 'BTW')) {
    return
  }

  if (payload === '' && isNil(props.field.value?.BTW?.start)) {
    emit('updateValue', undefined)

    return
  }

  const val = parseVal(payload)

  if (Number.isNaN(val)) {
    return
  }

  emit('updateValue', {
    BTW: {
      start: props.field.value?.BTW?.start,
      end: val,
    },
  })
}
</script>

<script lang="ts">
export default {
  name: 'NFilterManagerFormCreateFilterFieldNumber',
}
</script>

<template>
  <NFormItem class="n-filter-manager-form-create-filter-field__body-field" :label="field.label">
    <NSelect
      :model-value="operation"
      placeholder="Select"
      :teleported="false"
      @update:model-value="handleUpdateOperation"
    >
      <NOption v-for="item in operations" :key="item.value" :label="item.label" :value="item.value" />
    </NSelect>
  </NFormItem>
  <NFormItem
    v-if="assertFilterNumberEqByOperation(field, operation)"
    class="n-filter-simple-list-item-popper-content__select-value"
    label="Точное значение"
  >
    <NInput :model-value="field.value?.EQ" @update:model-value="handleUpdateEq" />
  </NFormItem>
  <NFormItem
    v-if="assertFilterNumberGteByOperation(field, operation)"
    class="n-filter-simple-list-item-popper-content__select-value"
    label="Больше"
  >
    <NInput :model-value="field.value?.GTE" @update:model-value="handleUpdateGte" />
  </NFormItem>
  <NFormItem
    v-if="assertFilterNumberLteByOperation(field, operation)"
    label="Меньше"
    class="n-filter-simple-list-item-popper-content__select-value"
  >
    <NInput :model-value="field.value?.LTE" @update:model-value="handleUpdateLte" />
  </NFormItem>

  <template v-else-if="assertFilterNumberBtwByOperation(field, operation)">
    <NFormItem label="Начало" class="n-filter-simple-list-item-popper-content__select-value">
      <NInput :model-value="field.value?.BTW?.start" @update:model-value="handleUpdateBtwStart" />
    </NFormItem>
    <NFormItem label="Конец" class="n-filter-simple-list-item-popper-content__select-value">
      <NInput :model-value="field.value?.BTW?.end" @update:model-value="handleUpdateBtwEnd" />
    </NFormItem>
  </template>
</template>
