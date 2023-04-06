<script setup lang="ts">
import { NIconPlus } from '@nado/ui-kit-icons-vue'
import { NButton } from '@nado/ui-kit-vue'

function buttonOnClick() {
  console.log('CLICK')
}
</script>

<template>
  <h3 class="n-title-3">Label + Icon</h3>
  <div class="row">
    <div class="col">
      <NButton :icon="NIconPlus" label="Кнопка" @click="buttonOnClick" />
    </div>
    <div class="col">
      <NButton :icon-right="NIconPlus" label="Кнопка" @click="buttonOnClick" />
    </div>
    <div class="col">
      <NButton :icon="NIconPlus" :icon-right="NIconPlus" label="Кнопка" @click="buttonOnClick" />
    </div>
  </div>
</template>
