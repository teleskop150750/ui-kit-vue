<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { isBoolean, type Nillable } from '@nado/ui-kit-utils'
import { computed, ref, watch } from 'vue'

import { NButton } from '../../../NButton'
import { type CheckboxValueType, NCheckbox } from '../../../NCheckbox'
import { NDialog } from '../../../NDialog'
import { NDropdown, NDropdownItem, NDropdownMenu } from '../../../NDropdown'
import { NFormItem } from '../../../NForm'
import NFilterManagerFormCreateFilterField from '../NFilterManagerFormCreateFilterField/NFilterManagerFormCreateFilterField.vue'
import type { FieldFilter, Filter } from '../types'
import {
  filterManagerFormUpdateFilterEmits,
  filterManagerFormUpdateFilterProps,
} from './NFilterManagerFormUpdateFilter.model'

const props = defineProps(filterManagerFormUpdateFilterProps)
const emit = defineEmits(filterManagerFormUpdateFilterEmits)

const nsForm = useNamespace('form-filter')
const nsFormDialog = useNamespace('form-filter-dialog')
const canSave = ref(!props.filter.isSaved)
const formData = ref<Filter>({ ...props.filter, fields: props.filter.fields.map((f) => ({ ...f })) })
const addedField = ref<Nillable<FieldFilter>>(undefined)

const hiddenFields = computed(() => {
  const list = new Set(formData.value.fields.map((el) => el.name))

  return [...props.fields].filter((el) => !list.has(el.name))
})

function updateFieldFilterValue(field: FieldFilter, value: FieldFilter['value']) {
  field.value = value
}

function handleDeleteField(payload: FieldFilter) {
  formData.value.fields = formData.value.fields.filter((el) => el.name !== payload.name)
}

function preAddField(payload: FieldFilter) {
  if (formData.value.fields.findIndex((el) => el.name === payload.name) >= 0) {
    return
  }

  addedField.value = { ...payload }
}

function addField() {
  if (!addedField.value) {
    return
  }

  formData.value.fields.push(addedField.value)
  addedField.value = undefined
}

function handleUpdateVisible(payload: boolean) {
  emit('update:visible', payload)
}

function handleUpdateCanSaveFilter(payload: CheckboxValueType) {
  if (!isBoolean(payload)) {
    return
  }

  formData.value.isSaved = payload

  if (formData.value.isSaved) {
    formData.value.name = ''
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete formData.value.name
  }
}

function update() {
  emit('update', { ...formData.value })
  emit('update:visible', false)
}

watch(
  () => props.filter.id,
  () => {
    formData.value = { ...props.filter, fields: props.filter.fields.map((f) => ({ ...f })) }
    canSave.value = !props.filter.isSaved
  },
)
</script>

<script lang="ts">
export default {
  name: 'NFilterManagerFormUpdateFilter',
}
</script>

<template>
  <NDialog
    :model-value="visible"
    title="Фильтры"
    width="30%"
    :class="nsFormDialog.b()"
    close-on-click-modal
    @update:model-value="handleUpdateVisible"
  >
    <form :class="nsForm.b()" @submit.prevent>
      <div v-if="formData.isSaved" :class="nsForm.e('header')">
        <NFormItem label="Название фильтра" prop="filterName">
          <NInput v-model="formData.name" />
        </NFormItem>
      </div>

      <div :class="nsForm.e('body')">
        <NFilterManagerFormCreateFilterField
          v-for="field in formData.fields"
          :key="field.name"
          :field="field"
          @update-value="(payload) => updateFieldFilterValue(field, payload)"
          @delete="handleDeleteField"
        >
          <template #[`select-${field.name}`]="slotProps">
            <slot :name="`select-${field.name}`" v-bind="slotProps" />
          </template>
        </NFilterManagerFormCreateFilterField>
      </div>

      <div v-if="hiddenFields.length > 0" :class="nsForm.e('footer')">
        <NDropdown @command="preAddField" @hide="addField">
          <NButton mode="soft" label="Добавить" />
          <template #dropdown>
            <NDropdownMenu>
              <NDropdownItem v-for="field in hiddenFields" :key="field.name" :command="field">
                {{ field.label }}
              </NDropdownItem>
            </NDropdownMenu>
          </template>
        </NDropdown>
      </div>
    </form>
    <template #footer>
      <NCheckbox
        v-if="canSave"
        :model-value="formData.isSaved"
        label="Сохранить"
        @update:model-value="handleUpdateCanSaveFilter"
      />
      <NButton @click="update"> Сохранить </NButton>
    </template>
  </NDialog>
</template>

<style>
.n-form-filter__header {
  margin-bottom: 16px;
}

.n-form-filter__body {
  display: grid;
  gap: 16px;
}

.n-form-filter__footer {
  margin-top: 16px;
}

.n-form-filter-dialog .n-dialog__footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  justify-items: flex-start;
}

.n-form-filter-dialog .n-dialog__footer .n-button {
  grid-column: 2 / 3;

  justify-self: flex-end;
}
</style>
