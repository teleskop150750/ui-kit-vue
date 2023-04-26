<script setup lang="ts">
import { NFilter } from '@nado/ui-kit-vue'

const searchFields = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'age',
    label: 'Age',
  },
]
</script>

<template>
  <div>
    <h2 class="n-title-2">NFilter</h2>
    <div>
      <NFilter :search-fields="searchFields" />
    </div>
  </div>
</template>
