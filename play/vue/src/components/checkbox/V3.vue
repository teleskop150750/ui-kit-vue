<script lang="ts" setup>
import { NCheckbox, NCheckboxGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

function handleCheckAllChange(val: string | number | boolean) {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}

function handleCheckedCitiesChange(value: Array<string | number | boolean>) {
  const checkedCount = value.length

  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
</script>

<template>
  <h3>Indeterminate</h3>
  <div class="row">
    <NCheckbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</NCheckbox>
  </div>
  <div class="row">
    <NCheckboxGroup v-model="checkedCities" class="line" @change="handleCheckedCitiesChange">
      <NCheckbox v-for="city in cities" :key="city" :label="city">{{ city }}</NCheckbox>
    </NCheckboxGroup>
  </div>
</template>

<style scoped>
.line {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
