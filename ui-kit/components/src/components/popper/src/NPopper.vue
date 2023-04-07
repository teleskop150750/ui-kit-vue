<script lang="ts" setup>
import type { Instance as PopperInstance } from '@popperjs/core'
import { computed, provide, ref } from 'vue'

import { popperProps } from './popper.model'
import { type ElPopperInjectionContext, POPPER_INJECTION_KEY } from './tokens'

const props = defineProps(popperProps)

const triggerRef = ref<HTMLElement>()
const popperInstanceRef = ref<PopperInstance>()
const contentRef = ref<HTMLElement>()
const referenceRef = ref<HTMLElement>()
const role = computed(() => props.role)

const popperProvides = {
  /**
   * @description trigger element
   */
  triggerRef,
  /**
   * @description popperjs instance
   */
  popperInstanceRef,
  /**
   * @description popper content element
   */
  contentRef,
  /**
   * @description popper reference element
   */
  referenceRef,
  /**
   * @description role determines how aria attributes are distributed
   */
  role,
} as ElPopperInjectionContext

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
