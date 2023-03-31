<script setup lang="ts">
import { NIconSearch } from '@nado/ui-kit-icons-vue'
import { NButton, NInput } from '@nado/ui-kit-vue'
import { ref } from 'vue'

const input = ref('')
const type = ref('text')
const onClick = () => {
  type.value = type.value === 'text' ? 'textarea' : 'text'
}
</script>

<template>
  <h3 class="n-title-3">TODO: Mixed input</h3>

  <NButton label="ok" @click="onClick" />

  <div class="row">
    <div class="col">
      <NInput v-model="input" :type="type" placeholder="Please input">
        <template #append>
          <NButton :icon="NIconSearch" />
        </template>
      </NInput>
    </div>

    <div class="col">
      <NInput v-model="input" placeholder="Please input">
        <template #prepend>
          <NButton :icon="NIconSearch" />
        </template>
      </NInput>
    </div>
  </div>
</template>
