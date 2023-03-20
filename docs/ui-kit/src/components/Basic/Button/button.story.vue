<script setup lang="ts">
import { NButton, NButtonGroup } from '@nado/ui-kit-vue'
import { logEvent } from 'histoire/client'
import { computed, reactive } from 'vue'

import { componentSizes, iconsList, iconsMap } from '@/constants'
import { initThemeClasses } from '@/utils'

import { alignList, appearanceList, modeList, typeList } from './button.model'

initThemeClasses()

const basicButtonData = reactive({
  label: 'Button',
  slot: '',
  size: componentSizes[0].value,
  type: typeList[0].value,
  appearance: appearanceList[0].value,
  mode: modeList[0].value,
  align: alignList[2].value,
  round: false,
  loading: false,
  disabled: false,
  autofocus: false,
  icon: iconsList[0].value,
} as const)

const icon = computed(() => iconsMap[basicButtonData.icon])
</script>

<template>
  <Story title="Basic/Button" auto-props-disabled>
    <Variant title="Базовый">
      <NButton
        :label="basicButtonData.label"
        :appearance="basicButtonData.appearance"
        :mode="basicButtonData.mode"
        :size="basicButtonData.size"
        :align="basicButtonData.align"
        :disabled="basicButtonData.disabled"
        :round="basicButtonData.round"
        :loading="basicButtonData.loading"
        :autofocus="basicButtonData.autofocus"
        @click="logEvent('click', $event)"
      >
        {{ basicButtonData.slot }}
      </NButton>
    </Variant>
    <Variant title="Icon">
      <NButton
        :label="basicButtonData.label"
        :appearance="basicButtonData.appearance"
        :mode="basicButtonData.mode"
        :icon="icon"
        :size="basicButtonData.size"
        :align="basicButtonData.align"
        :disabled="basicButtonData.disabled"
        :round="basicButtonData.round"
        :loading="basicButtonData.loading"
        :autofocus="basicButtonData.autofocus"
        @click="logEvent('click', $event)"
      >
        {{ basicButtonData.slot }}
      </NButton>
    </Variant>
    <Variant title="Icon right">
      <NButton
        :label="basicButtonData.label"
        :appearance="basicButtonData.appearance"
        :mode="basicButtonData.mode"
        :icon-right="icon"
        :size="basicButtonData.size"
        :align="basicButtonData.align"
        :disabled="basicButtonData.disabled"
        :round="basicButtonData.round"
        :loading="basicButtonData.loading"
        :autofocus="basicButtonData.autofocus"
        @click="logEvent('click', $event)"
      >
        {{ basicButtonData.slot }}
      </NButton>
    </Variant>

    <Variant title="Icons">
      <NButton
        :label="basicButtonData.label"
        :appearance="basicButtonData.appearance"
        :mode="basicButtonData.mode"
        :icon="icon"
        :icon-right="icon"
        :size="basicButtonData.size"
        :align="basicButtonData.align"
        :disabled="basicButtonData.disabled"
        :round="basicButtonData.round"
        :loading="basicButtonData.loading"
        :autofocus="basicButtonData.autofocus"
        @click="logEvent('click', $event)"
      >
        {{ basicButtonData.slot }}
      </NButton>
    </Variant>

    <Variant title="Icon">
      <NButton
        :appearance="basicButtonData.appearance"
        :mode="basicButtonData.mode"
        :icon="icon"
        :size="basicButtonData.size"
        :align="basicButtonData.align"
        :disabled="basicButtonData.disabled"
        :round="basicButtonData.round"
        :loading="basicButtonData.loading"
        :autofocus="basicButtonData.autofocus"
        @click="logEvent('click', $event)"
      />
    </Variant>

    <Variant title="Group">
      <NButtonGroup>
        <NButton
          :label="basicButtonData.label"
          :appearance="basicButtonData.appearance"
          :mode="basicButtonData.mode"
          :size="basicButtonData.size"
          :align="basicButtonData.align"
          :disabled="basicButtonData.disabled"
          :round="basicButtonData.round"
          :loading="basicButtonData.loading"
          @click="logEvent('click', $event)"
        />
        <NButton
          :label="basicButtonData.label"
          :appearance="basicButtonData.appearance"
          :mode="basicButtonData.mode"
          :icon="icon"
          :size="basicButtonData.size"
          :align="basicButtonData.align"
          :disabled="basicButtonData.disabled"
          :round="basicButtonData.round"
          :loading="basicButtonData.loading"
          @click="logEvent('click', $event)"
        />
        <NButton
          :appearance="basicButtonData.appearance"
          :mode="basicButtonData.mode"
          :icon="icon"
          :size="basicButtonData.size"
          :align="basicButtonData.align"
          :disabled="basicButtonData.disabled"
          :round="basicButtonData.round"
          :loading="basicButtonData.loading"
          @click="logEvent('click', $event)"
        />
      </NButtonGroup>
    </Variant>

    <template #controls>
      <HstText v-model="basicButtonData.label" title="label" />
      <HstText v-model="basicButtonData.slot" title="slot" />
      <HstSelect v-model="basicButtonData.icon" title="icon" :options="iconsList" />
      <HstSelect v-model="basicButtonData.type" title="type" :options="typeList" />
      <HstRadio v-model="basicButtonData.appearance" title="appearance" :options="appearanceList" />
      <HstRadio v-model="basicButtonData.mode" title="mode" :options="modeList" />
      <HstSelect v-model="basicButtonData.align" title="align" :options="alignList" />
      <HstSelect v-model="basicButtonData.size" title="size" :options="componentSizes" />
      <HstCheckbox v-model="basicButtonData.round" title="round" />
      <HstCheckbox v-model="basicButtonData.autofocus" title="autofocus" />
      <HstCheckbox v-model="basicButtonData.loading" title="loading" />
      <HstCheckbox v-model="basicButtonData.disabled" title="disabled" />
    </template>
  </Story>
</template>

<style>
.histoire-generic-render-story {
  padding: 20px;
}
</style>
