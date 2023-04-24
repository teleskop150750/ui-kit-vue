<script setup lang="ts">
import { EVENT_CODE } from '@nado/ui-kit-constants'
import { useId } from '@nado/ui-kit-hooks'
import { composeEventHandlers } from '@nado/ui-kit-utils'
import { computed, inject, nextTick, provide, ref, unref } from 'vue'

import { NCollectionItem, ROVING_FOCUS_COLLECTION_INJECTION_KEY } from './roving-focus-group.model'
import { nPovingFocusItemEmits, nPovingFocusItemProps } from './roving-focus-item.model'
import { ROVING_FOCUS_GROUP_INJECTION_KEY, ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY } from './tokens'
import { focusFirst, getFocusIntent, reorderArray } from './utils'

const props = defineProps(nPovingFocusItemProps)
const emit = defineEmits(nPovingFocusItemEmits)
const { currentTabbedId, loop, onItemFocus, onItemShiftTab } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, undefined)!

const { getItems } = inject(ROVING_FOCUS_COLLECTION_INJECTION_KEY, undefined)!

const id = useId()
const rovingFocusGroupItemRef = ref<HTMLElement>()

const handleMousedown = composeEventHandlers(
  (event: MouseEvent) => {
    emit('mousedown', event)
  },
  (event) => {
    if (!props.focusable) {
      event.preventDefault()
    } else {
      onItemFocus(unref(id))
    }
  },
)

const handleFocus = composeEventHandlers(
  (event: FocusEvent) => {
    emit('focus', event)
  },
  () => {
    onItemFocus(unref(id))
  },
)

const handleKeydown = composeEventHandlers(
  (event: KeyboardEvent) => {
    emit('keydown', event)
  },
  (event: KeyboardEvent) => {
    const { key, shiftKey, target, currentTarget } = event

    if (key === EVENT_CODE.tab && shiftKey) {
      onItemShiftTab()

      return
    }

    if (target !== currentTarget) {
      return
    }

    const focusIntent = getFocusIntent(event)

    if (!focusIntent) {
      return
    }

    event.preventDefault()
    const items = getItems<typeof props>().filter((item) => item.focusable)

    let elements = items.map((item) => item.ref!)

    switch (focusIntent) {
      case 'last': {
        elements.reverse()
        break
      }
      case 'prev':
      case 'next': {
        if (focusIntent === 'prev') {
          elements.reverse()
        }

        const currentIdx = elements.indexOf(currentTarget as HTMLElement)

        elements = loop.value ? reorderArray(elements, currentIdx + 1)! : elements.slice(currentIdx + 1)
        break
      }
      default: {
        break
      }
    }

    nextTick(() => {
      focusFirst(elements)
    })
  },
)

const isCurrentTab = computed(() => currentTabbedId.value === unref(id))

provide(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
  rovingFocusGroupItemRef,
  tabIndex: computed(() => (unref(isCurrentTab) ? 0 : -1)),
  handleMousedown,
  handleFocus,
  handleKeydown,
})
</script>

<template>
  <NCollectionItem :id="id" :focusable="focusable" :active="active">
    <slot />
  </NCollectionItem>
</template>
