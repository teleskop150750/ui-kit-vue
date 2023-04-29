<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { NIconDelete } from '@nado/ui-kit-icons-vue'

import { assertFieldDate, assertFieldList, assertFieldNumber, assertFieldString, type FieldFilter } from '../types'
import {
  nFilterManagerFormCreateFilterFieldEmits,
  nFilterManagerFormCreateFilterFieldProps,
} from './filter-manager-form-create-filter-field.model'
import NFilterManagerFormCreateFilterFieldDate from './NFilterManagerFormCreateFilterFieldDate.vue'
import NFilterManagerFormCreateFilterFieldList from './NFilterManagerFormCreateFilterFieldList.vue'
import NFilterManagerFormCreateFilterFieldNumber from './NFilterManagerFormCreateFilterFieldNumber.vue'
import NFilterManagerFormCreateFilterFieldString from './NFilterManagerFormCreateFilterFieldString.vue'

const props = defineProps(nFilterManagerFormCreateFilterFieldProps)
const emit = defineEmits(nFilterManagerFormCreateFilterFieldEmits)
const ns = useNamespace('filter-manager-form-create-filter-field')

function handleDelete() {
  emit('delete', props.field)
}

function handleUpdateFieldValue(payload: FieldFilter['value']) {
  emit('updateValue', payload)
}
</script>

<script lang="ts">
export default {
  name: 'NFilterManagerFormCreateFilterField',
}
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('body')">
      <NFilterManagerFormCreateFilterFieldString
        v-if="assertFieldString(field)"
        :field="field"
        @update-value="handleUpdateFieldValue"
      />
      <NFilterManagerFormCreateFilterFieldNumber
        v-else-if="assertFieldNumber(field)"
        :field="field"
        @update-value="handleUpdateFieldValue"
      />
      <NFilterManagerFormCreateFilterFieldDate
        v-else-if="assertFieldDate(field)"
        :field="field"
        @update-value="handleUpdateFieldValue"
      />
      <NFilterManagerFormCreateFilterFieldList
        v-else-if="assertFieldList(field)"
        :field="field"
        @update-value="handleUpdateFieldValue"
      >
        <template #[`select-${field.name}`]="slotProps">
          <slot :name="`select-${field.name}`" v-bind="slotProps" />
        </template>
      </NFilterManagerFormCreateFilterFieldList>
    </div>
    <div :class="ns.e('actions')">
      <NButton mode="outline" :icon="NIconDelete" @click="handleDelete" />
    </div>
  </div>
</template>

<style>
.n-filter-manager-form-create-filter-field {
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 16px;
  align-items: flex-end;
}

.n-filter-manager-form-create-filter-field__body {
  display: flex;
  gap: 8px;
}

.n-filter-manager-form-create-filter-field__body-field {
  flex-grow: 1;
}
</style>
