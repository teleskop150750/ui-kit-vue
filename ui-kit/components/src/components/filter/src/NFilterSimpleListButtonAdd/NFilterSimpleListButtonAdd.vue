<script setup lang="ts">
import { NIconPlus } from '@nado/ui-kit-icons-vue'
import type { Nillable } from '@nado/ui-kit-utils'
import { computed, ref } from 'vue'

import { NButton } from '../../../button'
import { NDropdown, NDropdownItem, NDropdownMenu } from '../../../dropdown'
import type { FieldFilter } from '../types'
import { nFilterSimpleListButtonAddEmits, nFilterSimpleListButtonAddProps } from './filter-simple-list.model'

const props = defineProps(nFilterSimpleListButtonAddProps)
const emit = defineEmits(nFilterSimpleListButtonAddEmits)

const addedFilter = ref<Nillable<FieldFilter>>(undefined)
const filteredFields = computed(() => {
  const selectedList = new Set(props.filterFields.map((item) => item.name))

  return props.fields.filter((item) => !selectedList.has(item.name))
})

const hasItems = computed(() => filteredFields.value.length > 0)

function preAddField(payload: FieldFilter) {
  addedFilter.value = payload
}

function addField() {
  if (!addedFilter.value) {
    return
  }

  emit('add', addedFilter.value)
  addedFilter.value = undefined
}
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListButtonAdd',
}
</script>

<template>
  <NDropdown v-if="hasItems" @command="preAddField" @hide="addField">
    <NButton :icon="NIconPlus" mode="soft" />
    <template #dropdown>
      <NDropdownMenu>
        <NDropdownItem v-for="field in filteredFields" :key="field.name" :command="field">
          {{ field.label }}
        </NDropdownItem>
      </NDropdownMenu>
    </template>
  </NDropdown>
</template>
