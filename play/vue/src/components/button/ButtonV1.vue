<script setup lang="ts">
import { NIconPlus } from '@nado/ui-kit-icons-vue'
import { NButton, nButtonAppearances, nButtonMods } from '@ui/index'

function buttonOnClick() {
  // eslint-disable-next-line no-console
  console.log('CLICK')
}
</script>

<template>
  <h3 class="n-title-3">Base</h3>

  <div class="row">
    <NButton label="Кнопка" size="small" :icon-right="NIconPlus" @click="buttonOnClick" />
    <NButton label="Кнопка" size="default" :icon-right="NIconPlus" @click="buttonOnClick" />
    <NButton label="Кнопка" size="large" :icon-right="NIconPlus" @click="buttonOnClick" />
  </div>

  <template v-for="mode in nButtonMods" :key="mode">
    <div class="row">
      <template v-for="appearance in nButtonAppearances" :key="appearance">
        <div class="col">
          <NButton label="Кнопка" :appearance="appearance" :mode="mode" @click="buttonOnClick" />
        </div>
      </template>
    </div>
    <div class="row">
      <template v-for="appearance in nButtonAppearances" :key="appearance">
        <div class="col">
          <NButton label="Кнопка" :appearance="appearance" :mode="mode" loading @click="buttonOnClick" />
        </div>
      </template>
    </div>
    <div class="row">
      <template v-for="appearance in nButtonAppearances" :key="appearance">
        <div class="col">
          <NButton label="Кнопка" :appearance="appearance" :mode="mode" disabled @click="buttonOnClick" />
        </div>
      </template>
    </div>
    <div class="row">
      <template v-for="appearance in nButtonAppearances" :key="appearance">
        <div class="col">
          <NButton label="Кнопка" :appearance="appearance" :mode="mode" round @click="buttonOnClick" />
        </div>
      </template>
    </div>
  </template>
</template>
