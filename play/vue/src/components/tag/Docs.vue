<script setup lang="ts">
import { NTag, tagAppearances, tagMods } from '@nado/ui-kit-vue'
</script>

<template>
  <div>
    <h2 class="n-title-2">Tag</h2>
    <h3 class="n-title-3">Basic usage</h3>

    <template v-for="mode in tagMods" :key="mode">
      <div class="row">
        <template v-for="appearance in tagAppearances" :key="appearance">
          <div class="col">
            <NTag :mod="mode" :appearance="appearance">Tag</NTag>
          </div>
        </template>
      </div>
    </template>

    <template v-for="mode in tagMods" :key="mode">
      <div class="row">
        <template v-for="appearance in tagAppearances" :key="appearance">
          <div class="col">
            <NTag :mod="mode" :appearance="appearance" closable>Tag</NTag>
          </div>
        </template>
      </div>
    </template>

    <template v-for="mode in tagMods" :key="mode">
      <div class="row">
        <template v-for="appearance in tagAppearances" :key="appearance">
          <div class="col">
            <NTag :mod="mode" :appearance="appearance" round>Tag</NTag>
          </div>
        </template>
      </div>
    </template>

    <template v-for="mode in tagMods" :key="mode">
      <div class="row">
        <template v-for="appearance in tagAppearances" :key="appearance">
          <div class="col">
            <NTag :mod="mode" :appearance="appearance" round closable>Tag</NTag>
          </div>
        </template>
      </div>
    </template>

    <div class="row">
      <NTag size="small">Small</NTag>
      <NTag>Default</NTag>
      <NTag size="large">Large</NTag>
    </div>

    <div class="row">
      <NTag size="small" closable>Small</NTag>
      <NTag closable>Default</NTag>
      <NTag size="large" closable>Large</NTag>
    </div>

    <div class="row">
      <NTag round size="small" closable>Small</NTag>
      <NTag round closable>Default</NTag>
      <NTag round size="large" closable>Large</NTag>
    </div>
  </div>
</template>
