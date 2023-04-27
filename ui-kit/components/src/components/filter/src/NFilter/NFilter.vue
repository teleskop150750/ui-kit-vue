<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { ref } from 'vue'

import { NInput } from '../../../input'
import { NOption, NSelect } from '../../../select'
import NFilterManager from '../NFilterManager/NFilterManager.vue'
import NFilterSimpleList from '../NFilterSimpleList/NFilterSimpleList.vue'
import type { FilterField } from '../types'
import { nFilterEmits, nFilterProps } from './filter.model'

defineProps(nFilterProps)
const emit = defineEmits(nFilterEmits)
const ns = useNamespace('filter')

const searchValue = ref('')
const searchFilterValue = ref([])

function updateHandle(payload: FilterField[]) {
  emit('update:simpleFields', payload)
}
</script>

<script lang="ts">
export default {
  name: 'NFilter',
}
</script>

<template>
  <div :class="ns.b()">
    <NInput v-model="searchValue" :class="ns.e('search')" placeholder="Search" />
    <NSelect v-model="searchFilterValue" :class="ns.e('search-fields')" multiple collapse-tags placeholder="Fields">
      <NOption v-for="item in searchFields" :key="item.value" :label="item.label" :value="item.value" />
    </NSelect>
    <NFilterManager />
    <NFilterSimpleList :fields="fields" :selected-fields="simpleFields" @update:selected-fields="updateHandle">
    </NFilterSimpleList>
  </div>
</template>

<style>
.n-filter {
  display: flex;
  gap: 8px;
}

.n-filter__search {
  width: 200px;
}

.n-filter__search-fields {
  width: 200px;
}
</style>
