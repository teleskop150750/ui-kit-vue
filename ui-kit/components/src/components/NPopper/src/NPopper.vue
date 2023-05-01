<script lang="ts" setup>
import type { Instance as PopperInstance } from '@popperjs/core'
import { computed, provide, ref } from 'vue'

import { popperProps } from './NPopper.model'
import { type NPopperInjectionContext, POPPER_INJECTION_KEY } from './tokens'

const props = defineProps(popperProps)

const triggerRef = ref<HTMLElement>()
const popperInstanceRef = ref<PopperInstance>()
const contentRef = ref<HTMLElement>()
const referenceRef = ref<HTMLElement>()
const role = computed(() => props.role)

const popperProvides: NPopperInjectionContext = {
  triggerRef,
  popperInstanceRef,
  contentRef,
  referenceRef,
  role,
}

defineExpose(popperProvides)

provide(POPPER_INJECTION_KEY, popperProvides)
</script>

<script lang="ts">
export default {
  name: 'NPopper',
  inheritAttrs: false,
}
</script>

<template>
  <slot />
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-popper/index.css');
</style>
