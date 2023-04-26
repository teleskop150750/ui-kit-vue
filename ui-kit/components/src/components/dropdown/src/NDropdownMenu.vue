<script setup lang="ts">
import { EVENT_CODE } from '@nado/ui-kit-constants'
import { useFocusTrap, useNamespace } from '@nado/ui-kit-hooks'
import { composeEventHandlers, composeRefs } from '@nado/ui-kit-utils'
import { computed, inject, ref, unref } from 'vue'

import {
  focusFirst,
  ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  ROVING_FOCUS_GROUP_INJECTION_KEY,
} from '../../roving-focus-group'
import { FIRST_LAST_KEYS, LAST_KEYS } from './constants'
import { DROPDOWN_COLLECTION_INJECTION_KEY } from './dropdown.model'
import { dropdownMenuProps } from './dropdown-menu.model'
import { useDropdown } from './hooks'

const props = defineProps(dropdownMenuProps)
const ns = useNamespace('dropdown')
const { contentRef, role, triggerId, dropdownSize } = useDropdown().dropdownContext

// const { focusTrapRef, onKeydown } = inject(FOCUS_TRAP_INJECTION_KEY)!
const focusTrapRef = ref<HTMLElement>()

const { collectionRef: dropdownCollectionRef, getItems } = inject(DROPDOWN_COLLECTION_INJECTION_KEY)!
const { collectionRef: rovingFocusGroupCollectionRef } = inject(ROVING_FOCUS_COLLECTION_INJECTION_KEY)!

const { rovingFocusGroupRef, rovingFocusGroupRootStyle, onBlur, onFocus, onMousedown } = inject(
  ROVING_FOCUS_GROUP_INJECTION_KEY,
)!

const dropdownClasses = computed(() => [ns.b('menu'), ns.sm('menu', dropdownSize.value)])

const dropdownListWrapperRef = composeRefs(
  contentRef,
  dropdownCollectionRef,
  focusTrapRef,
  rovingFocusGroupRef,
  rovingFocusGroupCollectionRef,
)

const { activate } = useFocusTrap(focusTrapRef, {
  // onDeactivate: handleClose,
  allowOutsideClick: true,
})

activate()

const composedKeydown = composeEventHandlers(
  (event: KeyboardEvent) => {
    props.onKeydown?.(event)
  },
  (event) => {
    const { currentTarget, code, target } = event
    const isKeydownContained = (currentTarget as Node).contains(target as Node)

    if (isKeydownContained) {
      // TODO: implement typeahead search
    }

    if (EVENT_CODE.tab === code) {
      event.stopImmediatePropagation()
    }

    event.preventDefault()

    if (target !== unref(contentRef)) {
      return
    }

    if (!FIRST_LAST_KEYS.includes(code)) {
      return
    }

    const items = getItems<{ disabled: boolean }>().filter((item) => !item.disabled)
    const targets = items.map((item) => item.ref!)

    if (LAST_KEYS.includes(code)) {
      targets.reverse()
    }

    focusFirst(targets)
  },
)

function handleKeydown(event: KeyboardEvent) {
  composedKeydown(event)
  // onKeydown(e)
}
</script>

<script lang="ts">
export default {
  name: 'NDropdownMenu',
}
</script>

<template>
  <ul
    :ref="dropdownListWrapperRef"
    :class="dropdownClasses"
    :style="rovingFocusGroupRootStyle"
    :tabindex="-1"
    :role="role"
    :aria-labelledby="triggerId"
    @blur="onBlur"
    @focus="onFocus"
    @keydown.self="handleKeydown"
    @mousedown.self="onMousedown"
  >
    <slot />
  </ul>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-dropdown/n-dropdown-menu/index.css');
</style>
