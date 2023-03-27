<script setup lang="ts">
import { NIconSearch } from '@nado/ui-kit-icons-vue'
import { NInput } from '@ui/index'
import { ref } from 'vue'

const input = ref('')
const input2 = ref('Text')
</script>

<template>
  <h3 class="n-title-3">Disabled</h3>

  <div class="row">
    <div class="col">
      <NInput v-model="input" disabled placeholder="Please input" :suffix-icon="NIconSearch" />
    </div>
    <div class="col">
      <NInput v-model="input2" disabled placeholder="Please input" :suffix-icon="NIconSearch" />
    </div>
  </div>
</template>
