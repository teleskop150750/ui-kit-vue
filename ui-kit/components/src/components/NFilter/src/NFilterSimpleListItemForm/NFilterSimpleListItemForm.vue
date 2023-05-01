<script setup lang="ts">
import type { Nillable } from '@nado/ui-kit-utils'
import { computed, inject, ref, watch } from 'vue'

import { NButton } from '../../../NButton'
import { TOOLTIP_INJECTION_KEY } from '../../../NTooltip'
import {
  assertFieldDate,
  assertFieldList,
  assertFieldNumber,
  assertFieldString,
  type FieldFilter,
  FieldFilterTypeMap,
} from '../types'
import { filterSimpleListItemFormEmits, filterSimpleListItemFormProps } from './NFilterSimpleListItemForm.model'
import NFilterSimpleListItemFormDate from './NFilterSimpleListItemFormDate.vue'
import NFilterSimpleListItemFormList from './NFilterSimpleListItemFormList.vue'
import NFilterSimpleListItemFormNumber from './NFilterSimpleListItemFormNumber.vue'
import NFilterSimpleListItemFormString from './NFilterSimpleListItemFormString.vue'

const props = defineProps(filterSimpleListItemFormProps)
const emit = defineEmits(filterSimpleListItemFormEmits)

const { close } = inject(TOOLTIP_INJECTION_KEY)!

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formFieldRef = ref<any>()
const filterValueFormData = ref<Nillable<FieldFilter['value']>>(props.field.value)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormComponents = computed<any>(() => {
  if (assertFieldString(props.field)) {
    return NFilterSimpleListItemFormString
  }

  if (assertFieldNumber(props.field)) {
    return NFilterSimpleListItemFormNumber
  }

  if (assertFieldDate(props.field)) {
    return NFilterSimpleListItemFormDate
  }

  if (assertFieldList(props.field)) {
    return NFilterSimpleListItemFormList
  }

  return undefined
})

function handleUpdateValue(payload?: FieldFilter['value']) {
  filterValueFormData.value = payload
}

function handleSave() {
  emit('updateValue', filterValueFormData.value)

  close()
}

watch(
  () => props.field.value,
  (val) => {
    filterValueFormData.value = val
  },
  {
    deep: true,
  },
)

defineExpose({
  resetValues: () => {
    formFieldRef.value?.resetValues()
  },
})
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItemForm',
}
</script>

<template>
  <form class="n-filter-simple-list-item-form" @submit.prevent="handleSave">
    <div class="n-filter-simple-list-item-form__body">
      <component
        :is="FormComponents"
        v-if="FormComponents"
        ref="formFieldRef"
        :field="field"
        @update-value="handleUpdateValue"
      >
        <template v-if="field.type === FieldFilterTypeMap.LIST" #[`select-${field.name}`]="slotProps">
          <slot :name="`select-${field.name}`" v-bind="slotProps" />
        </template>
      </component>
    </div>
    <NButton type="submit" label="Применить" />
  </form>
</template>

<style>
.n-filter-simple-list-item-form {
  display: grid;
  gap: 8px;
}

.n-filter-simple-list-item-form__body {
  display: grid;
  gap: 16px;
}

.n-filter-simple-list-item-form__value-between {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
