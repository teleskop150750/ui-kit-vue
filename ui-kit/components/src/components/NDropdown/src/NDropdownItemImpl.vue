<script setup lang="ts">
import { EVENT_CODE } from '@nado/ui-kit-constants'
import { useNamespace } from '@nado/ui-kit-hooks'
import { composeEventHandlers, composeRefs } from '@nado/ui-kit-utils'
import { computed, inject } from 'vue'

import { COLLECTION_ITEM_SIGN } from '../../NCollection'
import { NIcon } from '../../NIcon'
import {
  ROVING_FOCUS_COLLECTION_ITEM_INJECTION_KEY,
  ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY,
} from '../../NRovingFocusGroup'
import { useDropdown } from './hooks'
import { DROPDOWN_COLLECTION_ITEM_INJECTION_KEY } from './NDropdown.model'
import { dropdownItemImplEmits, dropdownItemImplProps } from './NDropdownItemImpl.model'

defineProps(dropdownItemImplProps)
const emit = defineEmits(dropdownItemImplEmits)

const ns = useNamespace('dropdown')

const { role: menuRole } = useDropdown().dropdownContext
const { collectionItemRef: dropdownCollectionItemRef } = inject(DROPDOWN_COLLECTION_ITEM_INJECTION_KEY)!
const { collectionItemRef: rovingFocusCollectionItemRef } = inject(ROVING_FOCUS_COLLECTION_ITEM_INJECTION_KEY)!

const {
  rovingFocusGroupItemRef,
  tabIndex,
  handleFocus,
  handleKeydown: handleItemKeydown,
  handleMousedown,
} = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY)!

const itemRef = composeRefs(dropdownCollectionItemRef, rovingFocusCollectionItemRef, rovingFocusGroupItemRef)

const role = computed<string>(() => {
  if (menuRole.value === 'menu') {
    return 'menuitem'
  }

  if (menuRole.value === 'navigation') {
    return 'link'
  }

  return 'button'
})

const dataset = {
  [COLLECTION_ITEM_SIGN]: '',
}

const handleKeydown = composeEventHandlers((event: KeyboardEvent) => {
  const { code } = event

  if (code !== EVENT_CODE.enter && code !== EVENT_CODE.space) {
    return false
  }

  event.preventDefault()
  event.stopImmediatePropagation()
  emit('clickImpl', event)

  return true
}, handleItemKeydown)

function handleClick(event: MouseEvent) {
  emit('clickImpl', event)
}

function handlePointermove(event: PointerEvent) {
  emit('pointermove', event)
}

function handlePointerleave(event: PointerEvent) {
  emit('pointerleave', event)
}
</script>

<script lang="ts">
export default {
  name: 'DropdownItemImpl',
}
</script>

<template>
  <li v-if="divided" role="separator" :class="ns.sem('menu', 'item', 'divided')" v-bind="$attrs" />
  <li
    :ref="itemRef"
    v-bind="{ ...dataset, ...$attrs }"
    :aria-disabled="disabled"
    :class="[ns.se('menu', 'item'), ns.is('disabled', disabled)]"
    :tabindex="tabIndex"
    :role="role"
    @click="handleClick"
    @focus="handleFocus"
    @keydown.self="handleKeydown"
    @mousedown="handleMousedown"
    @pointermove="handlePointermove"
    @pointerleave="handlePointerleave"
  >
    <NIcon v-if="icon">
      <component :is="icon" />
    </NIcon>
    <slot />
  </li>
</template>
