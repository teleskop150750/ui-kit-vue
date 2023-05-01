<script lang="ts" setup>
import { useFocusTrap } from '@nado/ui-kit-hooks'
import { isElement, isNil, NOOP } from '@nado/ui-kit-utils'
import { inject, onBeforeUnmount, onMounted, provide, ref, unref, watch, type WatchStopHandle } from 'vue'

import { FORM_ITEM_INJECTION_KEY } from '../../NForm'
import { usePopperContent, usePopperContentDOM } from './hooks'
import { popperContentEmits, popperContentProps } from './NPopperContent.model'
import { POPPER_CONTENT_INJECTION_KEY } from './tokens'

const props = defineProps(popperContentProps)

defineEmits(popperContentEmits)

const {
  attributes,
  arrowRef,
  contentRef: popperContentRef,
  styles,
  instanceRef,
  role,
  update,
} = usePopperContent(props)

const { ariaModal, arrowStyle, contentAttrs, contentClass, contentStyle, updateZIndex } = usePopperContentDOM(props, {
  styles,
  attributes,
  role,
})

const { activate, deactivate } = useFocusTrap(popperContentRef, {
  escapeDeactivates: props.escapeDeactivates,
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

function updatePopper(shouldUpdateZIndex = true) {
  update()
  shouldUpdateZIndex && updateZIndex()
}

function togglePopperAlive() {
  updatePopper(false)

  // if (props.visible && props.focusOnShow) {
  //   trapped.value = true
  // } else if (props.visible === false) {
  //   trapped.value = false
  // }
}

function toggleTrapping(val: boolean) {
  if (val) {
    activate()
  } else {
    deactivate()
  }
}

watch(() => props.isTrapping, toggleTrapping, { immediate: true })

onMounted(() => {
  watch(
    () => props.triggerTargetEl,
    (triggerTargetEl, prevTriggerTargetEl) => {
      triggerTargetAriaStopWatch?.()
      triggerTargetAriaStopWatch = undefined

      const el = unref(triggerTargetEl || popperContentRef.value)
      const prevEl = unref(prevTriggerTargetEl || popperContentRef.value)

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
  popperContentRef,
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
    ref="popperContentRef"
    v-bind="contentAttrs"
    :style="contentStyle"
    :class="contentClass"
    tabindex="-1"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <slot />
  </div>
</template>
