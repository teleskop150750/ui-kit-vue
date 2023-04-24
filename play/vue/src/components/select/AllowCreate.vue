<script setup lang="ts">
import { NOption, NSelect } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const value = ref<string[]>([])
const options = [
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
]
</script>

<template>
  <h2>AllowCreate</h2>
  <NSelect v-model="value" multiple filterable :reserve-keyword="false" placeholder="Choose tags for your article">
    <NOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </NSelect>
</template>
