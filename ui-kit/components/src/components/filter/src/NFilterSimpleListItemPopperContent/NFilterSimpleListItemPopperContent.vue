<script setup lang="ts">
import type { Nillable } from '@nado/ui-kit-utils'
import { inject, ref, watch } from 'vue'

import { NButton } from '../../../button'
import { TOOLTIP_INJECTION_KEY } from '../../../tooltip'
import { assertFieldDate, assertFieldList, assertFieldNumber, assertFieldString, type Filter } from '../types'
import {
  nFilterSimpleListPopperContentEmits,
  nFilterSimpleListPopperContentProps,
} from './filter-simple-list-item-popper-content.model'
import type { NFilterSimpleListItemPopperContentBodyNumberInstance } from './filter-simple-list-item-popper-content-body-number.model'
import type { NFilterSimpleListItemPopperContentBodyStringInstance } from './filter-simple-list-item-popper-content-body-string.model'
import NFilterSimpleListItemPopperContentBodyDate from './NFilterSimpleListItemPopperContentBodyDate.vue'
import NFilterSimpleListItemPopperContentBodyList from './NFilterSimpleListItemPopperContentBodyList.vue'
import NFilterSimpleListItemPopperContentBodyNumber from './NFilterSimpleListItemPopperContentBodyNumber.vue'
import NFilterSimpleListItemPopperContentBodyString from './NFilterSimpleListItemPopperContentBodyString.vue'

const props = defineProps(nFilterSimpleListPopperContentProps)
const emit = defineEmits(nFilterSimpleListPopperContentEmits)

const { close } = inject(TOOLTIP_INJECTION_KEY)!

const stringRef = ref<NFilterSimpleListItemPopperContentBodyStringInstance>()
const numberRef = ref<NFilterSimpleListItemPopperContentBodyNumberInstance>()
const value = ref<Nillable<Filter>>(props.field.value as Filter)

function handleUpdateValue(payload?: Filter) {
  value.value = payload
}

function handleSave() {
  emit('updateValue', value.value)

  close()
}

function resetValues() {
  stringRef.value?.resetValues()
  numberRef.value?.resetValues()
}

watch(
  () => props.field.value,
  (val) => {
    value.value = val as Filter
  },
  {
    deep: true,
  },
)

defineExpose({
  resetValues,
})
</script>

<script lang="ts">
export default {
  name: 'NFilterSimpleListItemPopperContent',
}
</script>

<template>
  <div class="n-filter-simple-list-item-popper-content">
    <div class="n-filter-simple-list-item-popper-content__body">
      <div v-if="assertFieldString(field)" class="n-filter-simple-list-item-popper-content__input">
        <NFilterSimpleListItemPopperContentBodyString
          ref="stringRef"
          :field="field"
          @update-value="handleUpdateValue"
        />
      </div>
      <div v-if="assertFieldNumber(field)" class="n-filter-simple-list-item-popper-content__input">
        <NFilterSimpleListItemPopperContentBodyNumber
          ref="numberRef"
          :field="field"
          @update-value="handleUpdateValue"
        />
      </div>
      <div v-if="assertFieldDate(field)" class="n-filter-simple-list-item-popper-content__input">
        <NFilterSimpleListItemPopperContentBodyDate ref="numberRef" :field="field" @update-value="handleUpdateValue" />
      </div>
      <div v-if="assertFieldList(field)" class="n-filter-simple-list-item-popper-content__input">
        <NFilterSimpleListItemPopperContentBodyList ref="numberRef" :field="field" @update-value="handleUpdateValue" />
      </div>
    </div>
    <NButton label="Применить_" @click="handleSave" />
  </div>
</template>

<style>
.n-filter-simple-list-item-popper-content {
  display: grid;
  gap: 8px;
}

.n-filter-simple-list-item-popper-content__body-inner {
  display: grid;
  gap: 16px;
}

.n-filter-simple-list-item-popper-content__select-between {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
