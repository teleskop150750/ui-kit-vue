<script setup lang="ts">
import { NIconSearch } from '@nado/ui-kit-icons-vue'
import { NInput } from '@ui/index'
import { ref } from 'vue'

const input = ref('')

const onFocus = () => {
  console.log('onFocus')
}
</script>

<template>
  <h3 class="n-title-3">Base</h3>
  <div class="row">
    <div class="col">
      <div class="col">
        <NInput
          v-model="input"
          size="small"
          placeholder="Please input"
          :suffix-icon="NIconSearch"
          :prefix-icon="NIconSearch"
          @focus="onFocus"
        />
      </div>

      <div class="col">
        <NInput v-model="input" size="default" placeholder="Please input">
          <template #prefix="{ classes }">
            <NIconSearch :class="classes" />
          </template>
          <template #suffix="{ classes }">
            <NIconSearch :class="classes" />
          </template>
        </NInput>
      </div>

      <div class="col">
        <NInput
          v-model="input"
          size="large"
          placeholder="Please input"
          :suffix-icon="NIconSearch"
          :prefix-icon="NIconSearch"
        />
      </div>
    </div>
  </div>
</template>
