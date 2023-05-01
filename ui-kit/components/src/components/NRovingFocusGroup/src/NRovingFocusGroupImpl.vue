<script setup lang="ts">
import { composeEventHandlers, type Nillable } from '@nado/ui-kit-utils'
import { useEventListener } from '@vueuse/core'
import { computed, inject, provide, readonly, ref, toRef, unref, watch } from 'vue'

import {
  povingFocusGroupEmits,
  povingFocusGroupProps,
  ROVING_FOCUS_COLLECTION_INJECTION_KEY,
} from './NRovingFocusGroup.model'
import { ROVING_FOCUS_GROUP_INJECTION_KEY } from './tokens'
import { focusFirst } from './utils'

const props = defineProps(povingFocusGroupProps)
const emit = defineEmits(povingFocusGroupEmits)

const ENTRY_FOCUS_EVT = 'rovingFocusGroup.entryFocus'
const EVT_OPTS: EventInit = { bubbles: false, cancelable: true }

const currentTabbedId = ref<Nillable<string>>((props.currentTabId || props.defaultCurrentTabId) ?? undefined)
const isBackingOut = ref(false)
const isClickFocus = ref(false)
const rovingFocusGroupRef = ref<HTMLElement>()
const { getItems } = inject(ROVING_FOCUS_COLLECTION_INJECTION_KEY)!
const rovingFocusGroupRootStyle = computed(() => [
  {
    outline: 'none',
  },
  props.style!,
])

function onItemFocus(tabbedId: string) {
  emit('currentTabIdChange', tabbedId)
}

function onItemShiftTab() {
  isBackingOut.value = true
}

const onMousedown = composeEventHandlers(
  (event: MouseEvent) => {
    props.onMousedown?.(event)
  },
  () => {
    isClickFocus.value = true
  },
)

const onFocus = composeEventHandlers(
  (event: FocusEvent) => {
    props.onFocus?.(event)
  },
  (event) => {
    const isKeyboardFocus = !unref(isClickFocus)
    const { target, currentTarget } = event

    if (target === currentTarget && isKeyboardFocus && !unref(isBackingOut)) {
      const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS)

      currentTarget?.dispatchEvent(entryFocusEvt)

      if (!entryFocusEvt.defaultPrevented) {
        const items = getItems<{
          id: string
          focusable: boolean
          active: boolean
        }>().filter((item) => item.focusable)
        const activeItem = items.find((item) => item.active)!
        const currentItem = items.find((item) => item.id === unref(currentTabbedId))!
        const candidates = [activeItem, currentItem, ...items].filter(Boolean)
        const candidateNodes = candidates.map((item) => item.ref!)

        focusFirst(candidateNodes)
      }
    }

    isClickFocus.value = false
  },
)

const onBlur = composeEventHandlers(
  (event: Event) => {
    props.onBlur?.(event)
  },
  () => {
    isBackingOut.value = false
  },
)

function handleEntryFocus(...args: Array<Event>) {
  emit('entryFocus', ...args)
}

provide(ROVING_FOCUS_GROUP_INJECTION_KEY, {
  currentTabbedId: readonly(currentTabbedId),
  loop: toRef(props, 'loop'),
  tabIndex: computed(() => (unref(isBackingOut) ? -1 : 0)),
  rovingFocusGroupRef,
  rovingFocusGroupRootStyle,
  orientation: toRef(props, 'orientation'),
  dir: toRef(props, 'dir'),
  onItemFocus,
  onItemShiftTab,
  onBlur,
  onFocus,
  onMousedown,
})

watch(
  () => props.currentTabId,
  (val) => {
    currentTabbedId.value = val ?? undefined
  },
)

useEventListener(rovingFocusGroupRef, ENTRY_FOCUS_EVT, handleEntryFocus)
</script>

<script lang="ts">
export default {
  name: 'NRovingFocusGroupImpl',
  inheritAttrs: false,
}
</script>

<template>
  <slot />
</template>
