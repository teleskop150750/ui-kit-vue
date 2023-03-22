<script setup lang="ts">
import { NInput } from '@ui'
import { ref } from 'vue'

const input = ref('')
</script>

<template>
  <h3 class="n-title-3">Password box</h3>

  <div class="row">
    <div class="col" style="width: 250px">
      <NInput v-model="input" type="password" placeholder="Please input password" show-password />
    </div>
  </div>
</template>
