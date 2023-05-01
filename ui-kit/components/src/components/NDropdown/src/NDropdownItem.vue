<script setup lang="ts">
import { composeEventHandlers, whenMouse } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance, ref, unref, useAttrs } from 'vue'

import { NRovingFocusItem } from '../../NRovingFocusGroup'
import { useDropdown } from './hooks'
import { NCollectionItem } from './NDropdown.model'
import { dropdownItemEmits, dropdownItemProps } from './NDropdownItem.model'
import NDropdownItemImpl from './NDropdownItemImpl.vue'

const props = defineProps(dropdownItemProps)
const emit = defineEmits(dropdownItemEmits)
const attrs = useAttrs()
const { dropdownContext } = useDropdown()
const instance = getCurrentInstance()

const itemRef = ref<HTMLElement>()
const textContent = computed(() => unref(itemRef)?.textContent ?? '')

const { onItemEnter, onItemLeave } = useDropdown().dropdownContext

const handlePointerMove = composeEventHandlers(
  (event: PointerEvent) => {
    emit('pointermove', event)

    return event.defaultPrevented
  },
  whenMouse((event) => {
    if (props.disabled) {
      onItemLeave(event)

      return
    }

    const target = event.currentTarget as HTMLElement

    /**
     * This handles the following scenario:
     *   when the item contains a form element such as input element
     *   when the mouse is moving over the element itself which is contained by
     *   the item, the default focusing logic should be prevented so that
     *   it won't cause weird action.
     */
    if (target === document.activeElement || target.contains(document.activeElement)) {
      return
    }

    onItemEnter(event)

    if (!event.defaultPrevented) {
      target?.focus()
    }
  }),
)

const handlePointerLeave = composeEventHandlers(
  (event: PointerEvent) => {
    emit('pointerleave', event)

    return event.defaultPrevented
  },
  whenMouse((event) => {
    onItemLeave(event)
  }),
)

const handleClick = composeEventHandlers(
  (event: MouseEvent | KeyboardEvent) => {
    if (props.disabled) {
      return
    }

    emit('click', event)

    return event.type !== 'keydown' && event.defaultPrevented
  },
  (event) => {
    if (props.disabled) {
      event.stopImmediatePropagation()

      return
    }

    if (dropdownContext?.hideOnClick?.value) {
      dropdownContext.handleClick?.()
    }

    dropdownContext.commandHandler?.(props.command, instance, event)
  },
)

// direct usage of v-bind={ ...$props, ...$attrs } causes type errors
const propsAndAttrs = computed(() => ({ ...props, ...attrs }))
</script>

<script lang="ts">
export default {
  name: 'NDropdownItem',
  inheritAttrs: false,
}
</script>

<template>
  <NCollectionItem :disabled="disabled" :text-value="textValue ?? textContent">
    <NRovingFocusItem :focusable="!disabled">
      <NDropdownItemImpl
        v-bind="propsAndAttrs"
        @pointerleave="handlePointerLeave"
        @pointermove="handlePointerMove"
        @click-impl="handleClick"
      >
        <slot />
      </NDropdownItemImpl>
    </NRovingFocusItem>
  </NCollectionItem>
</template>
