<script setup lang="ts">
import { NIconSearch } from '@nado/ui-kit-icons-vue'
import { NInput } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const input = ref('')
</script>

<template>
  <h3 class="n-title-3">Clearable</h3>

  <div class="row">
    <div class="col" style="width: 250px">
      <NInput v-model="input" clearable placeholder="Please input" />
    </div>
    <div class="col">
      <NInput v-model="input" clearable placeholder="Please input" :suffix-icon="NIconSearch" />
    </div>
  </div>
</template>
