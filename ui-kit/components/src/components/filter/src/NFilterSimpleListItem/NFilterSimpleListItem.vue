<script setup lang="ts">
import { NIconClose, NIconDeleteFilled } from '@nado/ui-kit-icons-vue'
import { ref } from 'vue'

import { NButton, NButtonGroup } from '../../../button'
import { NPopover } from '../../../popover'
import type { NFilterSimpleListItemPopperContentInstance } from '../NFilterSimpleListItemPopperContent/filter-simple-list-item-popper-content.model'
import NFilterSimpleListItemPopperContent from '../NFilterSimpleListItemPopperContent/NFilterSimpleListItemPopperContent.vue'
import type { Filter, FilterField } from '../types'
import { nFilterFilterListItemEmits, nFilterSimpleListItemProps } from './filter-simple-list-item.model'

const props = defineProps(nFilterSimpleListItemProps)
const emit = defineEmits(nFilterFilterListItemEmits)

const popperContentRef = ref<NFilterSimpleListItemPopperContentInstance>()

function handleBeforeOpen() {
  popperContentRef.value?.resetValues()
}

function handleRemove() {
  emit('delete', props.field)
}

function updateValue(payload?: Filter) {
  const field = {
    ...props.field,
    value: payload,
  } as FilterField

  emit('update', field)
}

function handleClear() {
  updateValue()
}
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItem',
}
</script>

<template>
  <NButtonGroup appearance="primary">
    <NPopover trigger="click" :width="320" @before-enter="handleBeforeOpen">
      <template #reference>
        <NButton mode="outline">
          {{ field.label }}
        </NButton>
      </template>
      <NFilterSimpleListItemPopperContent ref="popperContentRef" :field="field" @update-value="updateValue" />
    </NPopover>
    <NButton v-if="field.value" mode="outline" :icon="NIconClose" @click="handleClear" />
    <NButton mode="outline" :icon="NIconDeleteFilled" @click="handleRemove" />
  </NButtonGroup>
</template>
