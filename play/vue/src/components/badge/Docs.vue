<script setup lang="ts">
import { badgeAppearances, badgeMods, NBadge } from '@nado/ui-kit-vue'
</script>

<template>
  <div>
    <h2 class="n-title-2">Badge</h2>
    <h3 class="n-title-3">Basic usage</h3>

    <template v-for="mode in badgeMods" :key="mode">
      <div class="row">
        <template v-for="appearance in badgeAppearances" :key="appearance">
          <div class="col">
            <NBadge :mod="mode" :appearance="appearance">Badge</NBadge>
          </div>
        </template>
      </div>
    </template>

    <template v-for="mode in badgeMods" :key="mode">
      <div class="row">
        <template v-for="appearance in badgeAppearances" :key="appearance">
          <div class="col">
            <NBadge :mod="mode" :appearance="appearance" closable>Badge</NBadge>
          </div>
        </template>
      </div>
    </template>

    <template v-for="mode in badgeMods" :key="mode">
      <div class="row">
        <template v-for="appearance in badgeAppearances" :key="appearance">
          <div class="col">
            <NBadge :mod="mode" :appearance="appearance" round>Badge</NBadge>
          </div>
        </template>
      </div>
    </template>

    <template v-for="mode in badgeMods" :key="mode">
      <div class="row">
        <template v-for="appearance in badgeAppearances" :key="appearance">
          <div class="col">
            <NBadge :mod="mode" :appearance="appearance" round closable>Badge</NBadge>
          </div>
        </template>
      </div>
    </template>

    <div class="row">
      <NBadge size="small">Small</NBadge>
      <NBadge>Default</NBadge>
      <NBadge size="large">Large</NBadge>
    </div>

    <div class="row">
      <NBadge size="small" closable>Small</NBadge>
      <NBadge closable>Default</NBadge>
      <NBadge size="large" closable>Large</NBadge>
    </div>

    <div class="row">
      <NBadge round size="small" closable>Small</NBadge>
      <NBadge round closable>Default</NBadge>
      <NBadge round size="large" closable>Large</NBadge>
    </div>
  </div>
</template>
