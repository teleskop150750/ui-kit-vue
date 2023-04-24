<script lang="ts" setup>
import { NOption, NOptionGroup, NSelect, type SelectVModel } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const value = ref<SelectVModel>('')
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: 'City name',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
]

function foo(val: SelectVModel) {
  console.log(val)
  console.log(typeof val)
  value.value = val
}
</script>

<template>
  <h2>Group</h2>
  <div>
    <pre>{{ value }}</pre>
  </div>
  <div class="row">
    <NSelect :model-value="value" placeholder="Select" @update:model-value="foo">
      <NOptionGroup v-for="group in options" :key="group.label" :label="group.label">
        <NOption v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
      </NOptionGroup>
    </NSelect>
  </div>
</template>
