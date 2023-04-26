<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { ref } from 'vue'

import { NInput } from '../../input'
import { NOption, NSelect } from '../../select'
import { nFilterProps } from './filter.model'
import NFilterManagerButton from './NFilterManagerButton.vue'

defineProps(nFilterProps)
const ns = useNamespace('filter')

const searchValue = ref('')
const searchFilterValue = ref([])
</script>

<script lang="ts">
export default {
  name: 'NFilter',
}
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('search-wrapper')">
      <NInput v-model="searchValue" :class="ns.e('search')" placeholder="Search" />
      <NSelect v-model="searchFilterValue" :class="ns.e('search-fields')" multiple collapse-tags placeholder="Fields">
        <NOption v-for="item in searchFields" :key="item.value" :label="item.label" :value="item.value" />
      </NSelect>
    </div>
    <NFilterManagerButton />
  </div>
  <pre>{{ searchFields }}</pre>
</template>

<style>
.n-filter {
  display: flex;
  gap: 2rem;
}

.n-filter__search-wrapper {
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
