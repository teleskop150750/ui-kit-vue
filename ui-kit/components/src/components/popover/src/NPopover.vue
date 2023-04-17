<script lang="ts" setup>
import { useNamespace } from '@nado/ui-kit-hooks'
import { addUnit } from '@nado/ui-kit-utils'
import { computed, ref, unref } from 'vue'

import { NTooltip, type NTooltipInstance } from '../../tooltip'
import { popoverEmits, popoverProps } from './popover.model'

const props = defineProps(popoverProps)

const emit = defineEmits(popoverEmits)

const ns = useNamespace('popover')
const updateEventKeyRaw = 'onUpdate:visible' as const

const handleUpdateVisible = computed(() => props[updateEventKeyRaw])

const tooltipRef = ref<NTooltipInstance>()

const popperRef = computed(() => unref(tooltipRef)?.popperRef)

const popperStyles = computed(() => [
  {
    width: addUnit(props.width),
  },
  props.popperStyle!,
])

const popperClasses = computed(() => [ns.b(), props.popperClass!, { [ns.m('plain')]: !!props.content }])

const gpuAcceleration = computed(() => props.transition === `${ns.namespace}-fade-in-linear`)

function hide() {
  tooltipRef.value?.hide()
}

function beforeEnter() {
  emit('beforeEnter')
}

function beforeLeave() {
  emit('beforeLeave')
}

function afterEnter() {
  emit('afterEnter')
}

function afterLeave() {
  emit('update:visible', false)
  emit('afterLeave')
}

defineExpose({
  /** @description popper ref */
  popperRef,
  /** @description hide popover */
  hide,
})
</script>

<script lang="ts">
export default {
  name: 'NPopover',
}
</script>

<template>
  <NTooltip
    ref="tooltipRef"
    v-bind="$attrs"
    :trigger="trigger"
    :placement="placement"
    :disabled="disabled"
    :visible="visible"
    :transition="transition"
    :popper-options="popperOptions"
    :tabindex="tabindex"
    :content="content"
    :offset="offset"
    :is-trapping="isTrapping"
    :show-after="showAfter"
    :hide-after="hideAfter"
    :auto-close="autoClose"
    :show-arrow="showArrow"
    :aria-label="title"
    :effect="effect"
    :enterable="enterable"
    :popper-class="popperClasses"
    :popper-style="popperStyles"
    :teleported="teleported"
    :persistent="persistent"
    :gpu-acceleration="gpuAcceleration"
    :escape-deactivates="escapeDeactivates"
    @update:visible="handleUpdateVisible"
    @before-show="beforeEnter"
    @before-hide="beforeLeave"
    @show="afterEnter"
    @hide="afterLeave"
  >
    <template v-if="$slots.reference">
      <slot name="reference" />
    </template>

    <template #content>
      <div v-if="title" :class="ns.e('title')" role="title">
        {{ title }}
      </div>
      <slot>
        {{ content }}
      </slot>
    </template>
  </NTooltip>
</template>
