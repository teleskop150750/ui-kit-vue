<script lang="ts" setup>
import { NCheckboxButton, NCheckboxGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const checkboxGroup1 = ref(['Shanghai'])
const checkboxGroup2 = ref(['Shanghai'])
const checkboxGroup3 = ref(['Shanghai'])
const checkboxGroup4 = ref(['Shanghai'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
</script>

<template>
  <h3>NCheckboxButton</h3>
  <div class="row">
    <NCheckboxGroup v-model="checkboxGroup1" size="large">
      <NCheckboxButton v-for="city in cities" :key="city" :label="city">
        {{ city }}
      </NCheckboxButton>
    </NCheckboxGroup>
  </div>
  <div class="row">
    <NCheckboxGroup v-model="checkboxGroup2">
      <NCheckboxButton v-for="city in cities" :key="city" :label="city">{{ city }}</NCheckboxButton>
    </NCheckboxGroup>
  </div>
  <div class="row">
    <NCheckboxGroup v-model="checkboxGroup3" size="small">
      <NCheckboxButton v-for="city in cities" :key="city" :label="city" :disabled="city === 'Beijing'">
        {{ city }}
      </NCheckboxButton>
    </NCheckboxGroup>
  </div>
  <div class="row">
    <NCheckboxGroup v-model="checkboxGroup4" size="small" disabled>
      <NCheckboxButton v-for="city in cities" :key="city" :label="city">{{ city }}</NCheckboxButton>
    </NCheckboxGroup>
  </div>
</template>
