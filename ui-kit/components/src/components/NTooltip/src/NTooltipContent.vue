<script setup lang="ts">
import { useNamespace, usePopperContainerId } from '@nado/ui-kit-hooks'
import { composeEventHandlers, type Nillable } from '@nado/ui-kit-utils'
import { onClickOutside } from '@vueuse/core'
import { computed, inject, onBeforeUnmount, ref, type StyleValue, unref, watch } from 'vue'

import { NPopperContent, type NPopperContentInstance } from '../../NPopper'
import { NPortal } from '../../NPortal'
import { useFocusTrap } from './hooks'
import { useTooltipContentProps } from './NTooltipContent.model'
import { TOOLTIP_INJECTION_KEY } from './tokens'

const props = defineProps(useTooltipContentProps)

const ns = useNamespace('tooltip')
// TODO move to popper ??
const { isTrapping, activate: activateFocusTrap, deactivate: deactivateFocusTrap } = useFocusTrap(props)
const { selector } = usePopperContainerId()
const contentRef = ref<Nillable<NPopperContentInstance>>()
const destroyed = ref(false)

const { controlled, id, isOpen, trigger, close, open, onShow, onHide, onBeforeShow, onBeforeHide } = inject(
  TOOLTIP_INJECTION_KEY,
  undefined,
)!

const transitionClass = computed(() => props.transition || `${ns.namespace}-fade-in-linear`)
const persistentRef = computed(() => {
  // For testing, we would always want the content to be rendered
  // to the DOM, so we need to return true here.
  if (process.env.NODE_ENV === 'test') {
    return true
  }

  return props.persistent
})

onBeforeUnmount(() => {
  destroyed.value = true
})

const shouldRender = computed(() => (unref(persistentRef) ? true : unref(isOpen)))

const shouldShow = computed(() => (props.disabled ? false : unref(isOpen)))

const appendTo = computed(() => props.appendTo || selector.value)

const contentStyle = computed(() => (props.style ?? {}) as StyleValue)

const ariaHidden = computed(() => !unref(isOpen))

let stopHandle: ReturnType<typeof onClickOutside>

function stopWhenControlled() {
  if (unref(controlled)) {
    return true
  }

  return false
}

const handleMouseEnter = composeEventHandlers(stopWhenControlled, () => {
  if (props.enterable && unref(trigger) === 'hover') {
    open()
  }
})

const handleMouseLeave = composeEventHandlers(stopWhenControlled, () => {
  if (unref(trigger) === 'hover') {
    close()
  }
})

function handleBeforeEnter() {
  contentRef.value?.updatePopper?.()
  onBeforeShow?.()
}

function handleAfterShow() {
  onShow()

  activateFocusTrap()

  stopHandle = onClickOutside(
    computed(() => contentRef.value?.popperContentRef),
    () => {
      if (unref(controlled)) {
        return
      }

      const $trigger = unref(trigger)

      if ($trigger !== 'hover') {
        close()
      }
    },
  )
}

function handleBeforeLeave() {
  deactivateFocusTrap()
  onBeforeHide?.()
}

function handleAfterLeave() {
  onHide()
}

function handleBlur() {
  if (!props.isVirtualTriggering) {
    close()
  }
}

watch(
  () => unref(isOpen),
  (val) => {
    if (!val) {
      stopHandle?.()
    }
  },
  {
    flush: 'post',
  },
)

watch(
  () => props.content,
  () => {
    contentRef.value?.updatePopper?.()
  },
)

defineExpose({
  contentRef,
})
</script>

<script lang="ts">
export default {
  name: 'NTooltipContent',
  inheritAttrs: false,
}
</script>

<template>
  <NPortal :disabled="!teleported" :to="appendTo">
    <transition
      :name="transitionClass"
      @before-enter="handleBeforeEnter"
      @after-enter="handleAfterShow"
      @before-leave="handleBeforeLeave"
      @after-leave="handleAfterLeave"
    >
      <NPopperContent
        v-if="shouldRender"
        v-show="shouldShow"
        :id="id"
        ref="contentRef"
        v-bind="$attrs"
        :aria-label="ariaLabel"
        :aria-hidden="ariaHidden"
        :boundaries-padding="boundariesPadding"
        :fallback-placements="fallbackPlacements"
        :gpu-acceleration="gpuAcceleration"
        :offset="offset"
        :placement="placement"
        :popper-options="popperOptions"
        :strategy="strategy"
        :effect="effect"
        :enterable="enterable"
        :pure="pure"
        :popper-class="popperClass"
        :popper-style="[popperStyle!, contentStyle]"
        :reference-el="referenceEl"
        :trigger-target-el="triggerTargetEl"
        :visible="shouldShow"
        :is-trapping="isTrapping"
        :escape-deactivates="escapeDeactivates"
        :z-index="zIndex"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @blur="handleBlur"
        @close="close"
      >
        <template v-if="!destroyed">
          <slot />
        </template>
      </NPopperContent>
    </transition>
  </NPortal>
</template>
