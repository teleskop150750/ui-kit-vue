<script setup lang="ts">
import { NIconPlus } from '@nado/ui-kit-icons-vue'
import { NButton, nButtonAppearances, NButtonGroup } from '@ui'

const buttonMods = ['solid', 'soft', 'outline'] as const

function buttonOnClick() {
  // eslint-disable-next-line no-console
  console.log('CLICK')
}
</script>

<template>
  <h3 class="n-title-3">Button Group</h3>

  <template v-for="mode in buttonMods" :key="mode">
    <div class="row">
      <template v-for="appearance in nButtonAppearances" :key="appearance">
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
