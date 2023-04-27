<script setup lang="ts">
import { NIconPlus } from '@nado/ui-kit-icons-vue'
import { computed } from 'vue'

import { NButton } from '../../../button'
import { NDropdown, NDropdownItem, NDropdownMenu } from '../../../dropdown'
import type { FilterField } from '../types'
import { nFilterSimpleListButtonAddEmits, nFilterSimpleListButtonAddProps } from './filter-simple-list.model'

const props = defineProps(nFilterSimpleListButtonAddProps)
const emit = defineEmits(nFilterSimpleListButtonAddEmits)

const filteredFields = computed(() => {
  const selectedList = new Set(props.selectedFields.map((item) => item.name))

  return props.fields.filter((item) => !selectedList.has(item.name))
})

const hasItems = computed(() => filteredFields.value.length > 0)

function handleCommand(field: FilterField) {
  emit('add', field)
}
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListButtonAdd',
}
</script>

<template>
  <NDropdown v-if="hasItems" @command="handleCommand">
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
