<script lang="ts" setup>
import { NOption, NSelect } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const value1 = ref([])
const value2 = ref([])
const value3 = ref([])
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<template>
  <div class="m-4">
    <p>default</p>
    <NSelect v-model="value1" multiple placeholder="Select" style="width: 240px">
      <NOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </NSelect>
  </div>
  <div class="m-4">
    <p>use collapse-tags</p>
    <NSelect v-model="value2" multiple collapse-tags placeholder="Select" style="width: 240px">
      <NOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </NSelect>
  </div>
  <div class="m-4">
    <p>use collapse-tags-tooltip</p>
    <NSelect v-model="value3" multiple collapse-tags collapse-tags-tooltip placeholder="Select" style="width: 240px">
      <NOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </NSelect>
  </div>
</template>
