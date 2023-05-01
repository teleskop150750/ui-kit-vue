<script setup lang="ts">
import { NIconPlus } from '@nado/ui-kit-icons-vue'
import { buttonAppearances, NButton, NButtonGroup } from '@nado/ui-kit-vue'

const buttonMods = ['solid', 'soft', 'outline'] as const

function buttonOnClick() {
  console.log('CLICK')
}
</script>

<template>
  <h3 class="n-title-3">Button Group</h3>

  <template v-for="mode in buttonMods" :key="mode">
    <div class="row">
      <template v-for="appearance in buttonAppearances" :key="appearance">
        <div class="col">
          <NButtonGroup>
            <NButton :appearance="appearance" :mode="mode" label="Кнопка" @click="buttonOnClick" />
            <NButton :appearance="appearance" :mode="mode" :icon="NIconPlus" label="Кнопка" @click="buttonOnClick" />
            <NButton :appearance="appearance" :mode="mode" :icon="NIconPlus" @click="buttonOnClick" />
          </NButtonGroup>
        </div>
      </template>
    </div>
  </template>
</template>
