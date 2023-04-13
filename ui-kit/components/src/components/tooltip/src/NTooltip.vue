<script lang="ts" setup>
import { useDelayedToggle, useId, usePopperContainer } from '@nado/ui-kit-hooks'
import { isBoolean, type Nillable } from '@nado/ui-kit-utils'
import { computed, onDeactivated, provide, readonly, ref, toRef, unref, watch } from 'vue'

import { NPopper, NPopperArrow, type NPopperContentInstance, type NPopperInstance } from '../../popper'
import NTooltipContent from './NTooltipContent.vue'
import NTooltipTrigger from './NTooltipTrigger.vue'
import { TOOLTIP_INJECTION_KEY } from './tokens'
import { tooltipEmits, useTooltipModelToggle, useTooltipProps } from './tooltip.model'

const props = defineProps(useTooltipProps)

const emit = defineEmits(tooltipEmits)

usePopperContainer()

const id = useId()
const popperRef = ref<Nillable<NPopperInstance>>()
const contentRef = ref<Nillable<NPopperContentInstance>>()

function updatePopper() {
  const popperComponent = unref(popperRef)

  if (popperComponent) {
    popperComponent.popperInstanceRef?.update()
  }
}

const isOpen = ref(false)
const toggleReason = ref<Event>()

const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
  indicator: isOpen,
  toggleReason,
})

const { delayOpen, delayClose } = useDelayedToggle({
  showAfter: toRef(props, 'showAfter'),
  hideAfter: toRef(props, 'hideAfter'),
  autoClose: toRef(props, 'autoClose'),
  open: show,
  close: hide,
})

const controlled = computed(() => isBoolean(props.visible) && !hasUpdateHandler.value)

provide(TOOLTIP_INJECTION_KEY, {
  controlled,
  id,
  isOpen: readonly(isOpen),
  trigger: toRef(props, 'trigger'),
  open: (event?: Event) => {
    delayOpen(event)
  },
  close: (event?: Event) => {
    delayClose(event)
  },
  toggle: (event?: Event) => {
    if (unref(isOpen)) {
      delayClose(event)
    } else {
      delayOpen(event)
    }
  },
  onShow: () => {
    emit('show', toggleReason.value)
  },
  onHide: () => {
    emit('hide', toggleReason.value)
  },
  onBeforeShow: () => {
    emit('beforeShow', toggleReason.value)
  },
  onBeforeHide: () => {
    emit('beforeHide', toggleReason.value)
  },
  updatePopper,
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && isOpen.value) {
      isOpen.value = false
    }
  },
)

function isFocusInsideContent() {
  const popperContent: HTMLElement | undefined = contentRef.value?.popperContentRef

  return popperContent && popperContent.contains(document.activeElement)
}

onDeactivated(() => isOpen.value && hide())

defineExpose({
  /**
   * @description el-popper component instance
   */
  popperRef,
  contentRef,
  /**
   * @description validate current focus event is trigger inside el-tooltip-content
   */
  isFocusInsideContent,
  updatePopper,
  delayOpen,
  delayClose,
  hide,
})
</script>

<template>
  <NPopper ref="popperRef" :role="role">
    <NTooltipTrigger
      :disabled="disabled"
      :trigger="trigger"
      :trigger-keys="triggerKeys"
      :virtual-ref="virtualRef"
      :is-virtual-triggering="isVirtualTriggering"
    >
      <slot v-if="$slots.default" />
    </NTooltipTrigger>
    <NTooltipContent
      ref="contentRef"
      :aria-label="ariaLabel"
      :boundaries-padding="boundariesPadding"
      :content="content"
      :disabled="disabled"
      :effect="effect"
      :enterable="enterable"
      :fallback-placements="fallbackPlacements"
      :hide-after="hideAfter"
      :gpu-acceleration="gpuAcceleration"
      :offset="offset"
      :persistent="persistent"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :pure="pure"
      :raw-content="rawContent"
      :reference-el="referenceEl"
      :trigger-target-el="triggerTargetEl"
      :show-after="showAfter"
      :strategy="strategy"
      :teleported="teleported"
      :transition="transition"
      :is-trapping="isTrapping"
      :is-virtual-triggering="isVirtualTriggering"
      :z-index="zIndex"
      :escape-deactivates="escapeDeactivates"
      :append-to="appendTo"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content" />
        <span v-else>{{ content }}</span>
      </slot>
      <NPopperArrow v-if="showArrow" :arrow-offset="arrowOffset" />
    </NTooltipContent>
  </NPopper>
</template>
