<script setup lang="ts">
import { NInput } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const textarea = ref('')
const textarea2 = ref('')
</script>

<template>
  <h3 class="n-title-3">Autosize Textarea</h3>
  <div class="row">
    <div class="col">
      <NInput v-model="textarea" autosize type="textarea" placeholder="Please input" />
    </div>
    <div class="col">
      <NInput v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="Please input" />
    </div>
  </div>
</template>
