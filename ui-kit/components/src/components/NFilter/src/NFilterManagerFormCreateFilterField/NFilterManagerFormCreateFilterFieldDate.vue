<script setup lang="ts">
import { isNil } from '@nado/ui-kit-utils'

import { NFormItem } from '../../../NForm'
import { NInput } from '../../../NInput'
import { NOption, NSelect } from '../../../NSelect'
import { useFieldDate } from '../hooks'
import {
  assertFilterDateBtwByOperation,
  assertFilterDateEqByOperation,
  assertFilterDateGteByOperation,
  assertFilterDateLteByOperation,
  FilterNumberOperatorMap,
} from '../types'
import {
  filterManagerFormCreateFilterFieldDateEmits,
  filterManagerFormCreateFilterFieldDateProps,
} from './NFilterManagerFormCreateFilterFieldDate.model'

const props = defineProps(filterManagerFormCreateFilterFieldDateProps)
const emit = defineEmits(filterManagerFormCreateFilterFieldDateEmits)

const { operation, operations } = useFieldDate(props)

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

  emit('updateValue', { EQ: payload })
}

function handleUpdateGte(payload: string) {
  if (payload === '') {
    emit('updateValue', undefined)

    return
  }

  emit('updateValue', { GTE: payload })
}

function handleUpdateLte(payload: string) {
  if (payload === '') {
    emit('updateValue', undefined)

    return
  }

  emit('updateValue', { LTE: payload })
}

function handleUpdateBtwStart(payload: string) {
  if (!assertFilterDateBtwByOperation(props.field, 'BTW')) {
    return
  }

  if (payload === '' && isNil(props.field.value?.BTW?.start)) {
    emit('updateValue', undefined)

    return
  }

  emit('updateValue', {
    BTW: {
      start: payload,
      end: props.field.value?.BTW?.end,
    },
  })
}

function handleUpdateBtwEnd(payload: string) {
  if (!assertFilterDateBtwByOperation(props.field, 'BTW')) {
    return
  }

  if (payload === '' && isNil(props.field.value?.BTW?.start)) {
    emit('updateValue', undefined)

    return
  }

  emit('updateValue', {
    BTW: {
      start: props.field.value?.BTW?.start,
      end: payload,
    },
  })
}
</script>

<script lang="ts">
export default {
  name: 'NFilterManagerFormCreateFilterFieldDate',
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
    v-if="assertFilterDateEqByOperation(field, operation)"
    class="n-filter-simple-list-item-popper-content__select-value"
    label="Точное значение"
  >
    <NInput :model-value="field.value?.EQ" type="date" @update:model-value="handleUpdateEq" />
  </NFormItem>
  <NFormItem
    v-if="assertFilterDateGteByOperation(field, operation)"
    class="n-filter-simple-list-item-popper-content__select-value"
    label="Больше"
  >
    <NInput :model-value="field.value?.GTE" type="date" @update:model-value="handleUpdateGte" />
  </NFormItem>
  <NFormItem
    v-if="assertFilterDateLteByOperation(field, operation)"
    label="Меньше"
    class="n-filter-simple-list-item-popper-content__select-value"
  >
    <NInput :model-value="field.value?.LTE" type="date" @update:model-value="handleUpdateLte" />
  </NFormItem>

  <template v-else-if="assertFilterDateBtwByOperation(field, operation)">
    <NFormItem label="Начало" class="n-filter-simple-list-item-popper-content__select-value">
      <NInput :model-value="field.value?.BTW?.start" type="date" @update:model-value="handleUpdateBtwStart" />
    </NFormItem>
    <NFormItem label="Конец" class="n-filter-simple-list-item-popper-content__select-value">
      <NInput :model-value="field.value?.BTW?.end" type="date" @update:model-value="handleUpdateBtwEnd" />
    </NFormItem>
  </template>
</template>
