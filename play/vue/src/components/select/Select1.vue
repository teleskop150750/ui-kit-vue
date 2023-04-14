<script lang="ts" setup>
import { NOption, NSelect } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const value = ref('')

const options = ref([
  {
    value: 'Option1',
    label: 'Option1',
    disabled: false,
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
])

const onClick = () => {
  options.value = [
    {
      value: 'Option1',
      label: 'Option1',
      disabled: true,
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
}
</script>

<template>
  <button type="button" @click="onClick">onClick</button>
  <NSelect v-model="value" class="m-2" placeholder="Select" size="large">
    <NOption
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="!!item.disabled"
    />
  </NSelect>
  <NSelect v-model="value" class="m-2" placeholder="Select">
    <NOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </NSelect>
  <NSelect v-model="value" class="m-2" placeholder="Select" size="small">
    <NOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </NSelect>
</template>
