<script lang="ts" setup>
import { NCheckbox, NCheckboxGroup } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
</script>

<template>
  <h3>Minimum / Maximum items checked</h3>
  <div class="row">
    <NCheckboxGroup v-model="checkedCities" :min="1" :max="2" class="line">
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
