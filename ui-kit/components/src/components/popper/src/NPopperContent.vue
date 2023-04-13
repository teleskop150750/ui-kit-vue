<script lang="ts" setup>
import { isElement, isNil, NOOP } from '@nado/ui-kit-utils'
import { inject, onBeforeUnmount, onMounted, provide, ref, unref, watch, type WatchStopHandle } from 'vue'

import { FORM_ITEM_INJECTION_KEY } from '../../form'
import { usePopperContent, usePopperContentDOM, usePopperContentFocusTrap } from './hooks'
import { nPopperContentProps, popperContentEmits } from './popper-content.model'
import { POPPER_CONTENT_INJECTION_KEY } from './tokens'

const props = defineProps(nPopperContentProps)

const emit = defineEmits(popperContentEmits)

const {
  // focusStartRef,
  trapped,

  // onFocusAfterReleased,
  // onFocusAfterTrapped,
  // onFocusInTrap,
  // onFocusoutPrevented,
  // onReleaseRequested,
} = usePopperContentFocusTrap(props, emit)

const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = usePopperContent(props)

const { ariaModal, arrowStyle, contentAttrs, contentClass, contentStyle, updateZIndex } = usePopperContentDOM(props, {
  styles,
  attributes,
  role,
})

const formItemContext = inject(FORM_ITEM_INJECTION_KEY, undefined)
const arrowOffset = ref<number>()

provide(POPPER_CONTENT_INJECTION_KEY, {
  arrowStyle,
  arrowRef,
  arrowOffset,
})

if (formItemContext && (!isNil(formItemContext.addInputId) || !isNil(formItemContext.removeInputId))) {
  // disallow auto-id from inside popper content
  provide(FORM_ITEM_INJECTION_KEY, {
    ...formItemContext,
    addInputId: NOOP,
    removeInputId: NOOP,
  })
}

let triggerTargetAriaStopWatch: WatchStopHandle | undefined = undefined

const updatePopper = (shouldUpdateZIndex = true) => {
  update()
  shouldUpdateZIndex && updateZIndex()
}

const togglePopperAlive = () => {
  updatePopper(false)

  if (props.visible && props.focusOnShow) {
    trapped.value = true
  } else if (props.visible === false) {
    trapped.value = false
  }
}

onMounted(() => {
  watch(
    () => props.triggerTargetEl,
    (triggerTargetEl, prevTriggerTargetEl) => {
      triggerTargetAriaStopWatch?.()
      triggerTargetAriaStopWatch = undefined

      const el = unref(triggerTargetEl || contentRef.value)
      const prevEl = unref(prevTriggerTargetEl || contentRef.value)

      if (isElement(el)) {
        triggerTargetAriaStopWatch = watch(
          [role, () => props.ariaLabel, ariaModal, () => props.id],
          (watches) => {
            ;['role', 'aria-label', 'aria-modal', 'id'].forEach((key, idx) => {
              isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]!)
            })
          },
          { immediate: true },
        )
      }

      if (prevEl !== el && isElement(prevEl)) {
        ;['role', 'aria-label', 'aria-modal', 'id'].forEach((key) => {
          prevEl.removeAttribute(key)
        })
      }
    },
    { immediate: true },
  )

  watch(() => props.visible, togglePopperAlive, { immediate: true })
})

onBeforeUnmount(() => {
  triggerTargetAriaStopWatch?.()
  triggerTargetAriaStopWatch = undefined
})

defineExpose({
  popperContentRef: contentRef,
  popperInstanceRef: instanceRef,
  updatePopper,
  contentStyle,
})
</script>

<script lang="ts">
export default {
  name: 'NPopperContent',
}
</script>

<template>
  <div
    ref="contentRef"
    v-bind="contentAttrs"
    :style="contentStyle"
    :class="contentClass"
    tabindex="-1"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <!-- <ElFocusTrap
      :trapped="trapped"
      :trap-on-focus-in="true"
      :focus-trap-el="contentRef"
      :focus-start-el="focusStartRef"
      @focus-after-trapped="onFocusAfterTrapped"
      @focus-after-released="onFocusAfterReleased"
      @focusin="onFocusInTrap"
      @focusout-prevented="onFocusoutPrevented"
      @release-requested="onReleaseRequested"
    > -->
    <slot />
    <!-- </ElFocusTrap> -->
  </div>
</template>
