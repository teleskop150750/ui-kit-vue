<script setup lang="ts">
import { NIconPlus } from '@nado/ui-kit-icons-vue'
import { NButton } from '@ui'

function buttonOnClick() {
  // eslint-disable-next-line no-console
  console.log('CLICK')
}
</script>

<template>
  <h3 class="n-title-3">Full width</h3>
  <div class="row">
    <div class="col" style="width: 100%; max-width: 300px">
      <NButton :icon="NIconPlus" label="Кнопка" plain @click="buttonOnClick" />
    </div>
  </div>
</template>
