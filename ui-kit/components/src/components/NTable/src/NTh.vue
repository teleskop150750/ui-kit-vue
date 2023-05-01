<script setup lang="tsx">
import { useNamespace } from '@nado/ui-kit-hooks'
import { NIconSort, NIconSortDown, NIconSortUp } from '@nado/ui-kit-icons-vue'
import { hSlot, hUniqueSlot } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance, useSlots } from 'vue'

import { thEmits, thProps } from './NTh.model'

const props = defineProps(thProps)
const emit = defineEmits(thEmits)

const slots = useSlots()
const ns = useNamespace('table')
const instance = getCurrentInstance()!
const col = computed(() => {
  if (!props.options) {
    return undefined
  }

  const name = instance.vnode.key as string | null
  const col = name ? props.options.colsMap[name] : props.options.col

  return col
})

const SortIcon = computed(() => {
  if (!col.value || !col.value.isSortable) {
    return undefined
  }

  if (col.value.sortOrder === 'ASC') {
    return NIconSortUp
  }

  if (col.value.sortOrder === 'DESC') {
    return NIconSortDown
  }

  return NIconSort
})

function handleSort(event: MouseEvent) {
  if (props.isDisableClick) {
    return
  }

  if (!col.value || !props.options) {
    return
  }

  const { options } = props
  const { sort } = options

  col.value!.isSortable === true && sort(col.value)
  emit('click', event)
}

function handlePointerDown(event: PointerEvent) {
  if (!col.value) {
    return
  }

  if (col.value.isOrderable) {
    emit('orderDown', event)
  }

  emit('pointerdown', event)
}

function handleResizerDown(event: PointerEvent) {
  if (!col.value) {
    return
  }

  event.stopPropagation()

  emit('resizerDown', event, col.value.name)
}

const Resizer = () => {
  if (!col.value) {
    return undefined
  }

  if (!col.value.isResizable) {
    return undefined
  }

  return <span class={ns.e('th-resizer')} onPointerdown={handleResizerDown}></span>
}

const Th = () => {
  if (props.options === undefined) {
    return (
      <th class={[ns.e('th')]}>
        <div class={ns.e('inner')}>{hSlot(slots.default)}</div>
      </th>
    )
  }

  if (!col.value) {
    return undefined
  }

  let child = undefined

  if (col.value.isSortable === true && SortIcon.value) {
    child = hUniqueSlot(slots.default, [])
    child.push(
      <span class={ns.e('th-sort')}>
        <SortIcon.value class={ns.e('th-sort-icon')} />
      </span>,
    )
  } else {
    child = hSlot(slots.default)
  }

  return (
    <th
      class={[
        ns.e('th'),
        ns.eIs('th', 'orderable', col.value.isOrderable),
        ns.eIs('th', 'sortable', col.value.isSortable),
      ]}
      onPointerdown={handlePointerDown}
      onClick={handleSort}
    >
      <div class={ns.e('th-inner')}>{child}</div>
      {Resizer()}
    </th>
  )
}
</script>

<script lang="tsx">
export default {
  name: 'NTh',
}
</script>

<template>
  <Th />
</template>
