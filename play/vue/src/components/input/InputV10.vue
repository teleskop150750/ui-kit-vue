<script setup lang="ts">
import { NInput } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const input = ref('')
</script>

<template>
  <h3 class="n-title-3">is-exceed Limit length</h3>
  <div class="row">
    <div class="col">
      <NInput v-model="input" maxlength="10" placeholder="Please input" show-word-limit type="text" />
    </div>

    <div class="col">
      <NInput v-model="input" maxlength="30" placeholder="Please input" show-word-limit type="textarea" />
    </div>
  </div>
</template>
