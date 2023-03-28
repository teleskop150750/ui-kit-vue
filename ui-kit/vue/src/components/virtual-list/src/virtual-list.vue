<script setup lang="ts">
import { useNamespace } from '@ui/hooks'
import { debounce, hasOwn, isFunction, isNumber, throwError } from '@ui/utils'
import { isClient } from '@vueuse/core'
import { computed, getCurrentInstance, nextTick, onMounted, onUpdated, ref, resolveDynamicComponent, unref } from 'vue'

import {
  AUTO_ALIGNMENT,
  BACKWARD,
  FORWARD,
  HORIZONTAL,
  ITEM_RENDER_EVT,
  RTL,
  RTL_OFFSET_NAG,
  RTL_OFFSET_POS_ASC,
  RTL_OFFSET_POS_DESC,
  SCROLL_EVT,
} from './defaults'
import { useCache, useDynamicList, useFixedList } from './hooks'
// import useWheel from '../hooks/use-wheel'
import NVirtualScrollbar from './scrollbar.vue'
import type { Alignment } from './types'
import { getIsHorizontal, getRTLOffsetType, getScrollDir } from './utils'
import { virtualizedListProps } from './virtual-list.model'

const props = defineProps(virtualizedListProps)
const emit = defineEmits([ITEM_RENDER_EVT, SCROLL_EVT])

const itemsCount = computed(() => {
  if (props.total !== undefined) {
    return props.total
  }

  return props.data.length
})

const totalSize = computed(() => {
  if (typeof props.itemSize === 'number') {
    return itemsCount.value * props.itemSize
  }

  if (props.estimatedItemSize !== undefined) {
    return itemsCount.value * props.estimatedItemSize
  }

  let result = 0

  for (let index = 0; index < itemsCount.value; index++) {
    result += props.itemSize(index)
  }

  return result
})

const {
  getItemOffset,
  getItemSize,
  getOffset,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  initCache,
  clearCache,
  validateProps,
} = isFunction(props.itemSize)
  ? useDynamicList(props, itemsCount, totalSize)
  : useFixedList(props, itemsCount, totalSize)

validateProps()
const instance = getCurrentInstance()!
const ns = useNamespace('virtual-list')
const dynamicSizeCache = ref(initCache(instance)!)
const getItemStyleCache = useCache()
// ссылки
// здесь windowRef и innerRef могут быть типом HTMLElement
// или определенный пользователем тип компонента, зависит от переданного типа
// пользователем
const containerRef = ref()
const innerRef = ref()
const scrollbarRef = ref()
const states = ref({
  isScrolling: false,
  scrollDir: FORWARD,
  scrollOffset: props.initScrollOffset,
  updateRequested: false,
})

// computed
const itemsToRender = computed(() => {
  const { cache } = props
  const { isScrolling, scrollDir, scrollOffset } = unref(states)

  if (itemsCount.value === 0) {
    return [0, 0]
  }

  const startIndex = getStartIndexForOffset(scrollOffset, unref(dynamicSizeCache))
  const stopIndex = getStopIndexForStartIndex(startIndex, scrollOffset, unref(dynamicSizeCache))
  const cacheBackward = isScrolling === false || scrollDir === BACKWARD ? Math.max(1, cache) : 1
  const cacheForward = isScrolling === false || scrollDir === FORWARD ? Math.max(1, cache) : 1

  return [
    Math.max(0, startIndex - cacheBackward),
    Math.max(0, Math.min(itemsCount.value - 1, stopIndex + cacheForward)),
    startIndex,
    stopIndex,
  ]
})

const isHorizontal = computed(() => getIsHorizontal(props.layout))
const containerStyle = computed(() => [
  {
    position: 'relative',
    [`overflow-${isHorizontal.value ? 'x' : 'y'}`]: 'scroll',
    WebkitOverflowScrolling: 'touch',
    willChange: 'transform',
  },
  {
    direction: props.direction,
    height: isNumber(props.height) ? `${props.height}px` : props.height,
    width: isNumber(props.width) ? `${props.width}px` : props.width,
  },
  props.style,
])

const innerStyle = computed(() => {
  const size = unref(totalSize)
  const horizontal = unref(isHorizontal)

  return {
    width: !horizontal ? '100%' : `${size}px`,
    height: horizontal ? '100%' : `${size}px`,
    pointerEvents: unref(states).isScrolling ? 'none' : undefined,
  }
})

const clientSize = computed(() => {
  const size = isHorizontal.value ? props.width : props.height

  if (size === undefined) {
    throwError('[NVirtualList]', 'Не установлен размер')
  }

  return size
})

// methods

// TODO: NADO
// const { onWheel } = useWheel({
//   atStartEdge: computed(() => states.value.scrollOffset <= 0),
//   atEndEdge: computed(() => states.value.scrollOffset >= estimatedTotalSize.value),
//   layout: computed(() => props.layout),
// }, (offset) => {
//   scrollbarRef.value.onMouseUp?.()
//   scrollTo(Math.min(states.value.scrollOffset + offset, estimatedTotalSize.value - clientSize.value))
// })

// TODO: оптимизация производительности здесь, сброс isScrolling с помощью debounce.
const resetIsScrolling = debounce(() => {
  states.value.isScrolling = false
  nextTick(() => {
    getItemStyleCache.value(-1, undefined, undefined)
  })
}, 10)

function emitEvents() {
  if (itemsCount.value > 0) {
    const [cacheStart, cacheEnd, visibleStart, visibleEnd] = unref(itemsToRender)

    emit(ITEM_RENDER_EVT, cacheStart, cacheEnd, visibleStart, visibleEnd)
  }

  const { scrollDir, scrollOffset, updateRequested } = unref(states)

  emit(SCROLL_EVT, scrollDir, scrollOffset, updateRequested)
}

function scrollVertically(evt: Event) {
  const { clientHeight, scrollHeight, scrollTop } = evt.currentTarget as HTMLElement
  const unStates = unref(states)

  if (unStates.scrollOffset === scrollTop) {
    return
  }

  const scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight))

  states.value = {
    ...unStates,
    isScrolling: true,
    scrollDir: getScrollDir(unStates.scrollOffset, scrollOffset),
    scrollOffset,
    updateRequested: false,
  }
  nextTick(() => resetIsScrolling())
}

function scrollHorizontally(evt: Event) {
  const { clientWidth, scrollLeft, scrollWidth } = evt.currentTarget as HTMLElement
  const _states = unref(states)

  if (_states.scrollOffset === scrollLeft) {
    return
  }

  const { direction } = props
  let scrollOffset = scrollLeft

  if (direction === RTL) {
    // Согласно спецификации, scrollLeft должен быть отрицательным для элементов, выровненных по RTL.
    // Однако это относится не ко всем браузерам
    // (например, Chrome сообщает о положительных значениях, измеренных относительно левого края).
    // Для этого компонента также будет проще, если мы преобразуем смещения в тот же формат,
    // в котором они были бы для ltr.
    // Итак, самое простое решение - определить, с каким поведением браузера мы имеем дело,
    // и преобразовать его на основе этого.
    switch (getRTLOffsetType()) {
      case RTL_OFFSET_NAG: {
        scrollOffset = -scrollLeft
        break
      }
      case RTL_OFFSET_POS_DESC: {
        scrollOffset = scrollWidth - clientWidth - scrollLeft
        break
      }
      default: {
        break
      }
    }
  }

  scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth))
  states.value = {
    ..._states,
    isScrolling: true,
    scrollDir: getScrollDir(_states.scrollOffset, scrollOffset),
    scrollOffset,
    updateRequested: false,
  }
  nextTick(() => resetIsScrolling())
}

function handleScroll(evt: Event) {
  unref(isHorizontal) ? scrollHorizontally(evt) : scrollVertically(evt)
  emitEvents()
}

function handleScrollbarScroll(distanceToGo: number, totalSteps: number) {
  const offset = ((totalSize.value - Number(clientSize.value)) / totalSteps) * distanceToGo

  scrollTo(Math.min(totalSize.value - Number(clientSize.value), offset))
}

function scrollTo(offset: number) {
  offset = Math.max(offset, 0)

  if (offset === unref(states).scrollOffset) {
    return
  }

  states.value = {
    ...unref(states),
    scrollOffset: offset,
    scrollDir: getScrollDir(unref(states).scrollOffset, offset),
    updateRequested: true,
  }

  nextTick(() => resetIsScrolling())
}

function scrollToItem(idx: number, alignment: Alignment = AUTO_ALIGNMENT) {
  const { scrollOffset } = unref(states)

  idx = Math.max(0, Math.min(idx, itemsCount.value - 1))
  scrollTo(getOffset(idx, alignment, scrollOffset, unref(dynamicSizeCache)))
}

function getItemStyle(idx: number) {
  const { direction, itemSize, layout } = props
  const itemStyleCache = getItemStyleCache.value(clearCache && itemSize, clearCache && layout, clearCache && direction)

  const dynamicSizeCacheUnref = unref(dynamicSizeCache)

  if (hasOwn(itemStyleCache, String(idx))) {
    return itemStyleCache[idx]
  }

  const offset = getItemOffset(idx, dynamicSizeCacheUnref)
  const size = getItemSize(idx, dynamicSizeCacheUnref)
  const horizontal = unref(isHorizontal)
  const isRtl = direction === RTL
  const offsetHorizontal = horizontal ? offset : 0

  itemStyleCache[idx] = {
    position: 'absolute',
    left: isRtl ? undefined : `${offsetHorizontal}px`,
    right: isRtl ? `${offsetHorizontal}px` : undefined,
    top: !horizontal ? `${offset}px` : 0,
    height: !horizontal ? `${size}px` : '100%',
    width: horizontal ? `${size}px` : '100%',
  }

  return itemStyleCache[idx]
}

function resetScrollTop() {
  const window = containerRef.value

  if (window) {
    window.scrollTop = 0
  }
}

// life cycles
onMounted(() => {
  if (!isClient) {
    return
  }

  const { initScrollOffset } = props
  const containerElement = unref(containerRef)

  if (isNumber(initScrollOffset) && containerElement) {
    if (unref(isHorizontal)) {
      containerElement.scrollLeft = initScrollOffset
    } else {
      containerElement.scrollTop = initScrollOffset
    }
  }

  emitEvents()
})

// TODO: See
onUpdated(() => {
  const { direction, layout } = props
  const { scrollOffset, updateRequested } = unref(states)
  const containerElement = unref(containerRef)

  if (!updateRequested || !containerElement) {
    return
  }

  if (layout !== HORIZONTAL) {
    containerElement.scrollTop = scrollOffset

    return
  }

  if (direction !== RTL) {
    containerElement.scrollLeft = scrollOffset

    return
  }

  // Согласно спецификации, scrollLeft должен быть отрицательным для элементов, выровненных по RTL.
  // Однако это относится не ко всем браузерам
  // (например, Chrome сообщает о положительных значениях, измеренных относительно левого края).
  // Итак, нам нужно определить, с каким поведением браузера мы имеем дело, и имитировать его.
  switch (getRTLOffsetType()) {
    case RTL_OFFSET_NAG: {
      containerElement.scrollLeft = -scrollOffset
      break
    }
    case RTL_OFFSET_POS_ASC: {
      containerElement.scrollLeft = scrollOffset
      break
    }
    default: {
      const { clientWidth, scrollWidth } = containerElement

      containerElement.scrollLeft = scrollWidth - clientWidth - scrollOffset
      break
    }
  }
})

defineExpose({
  containerRef,
  innerRef,
  getItemStyleCache,
  scrollTo,
  scrollToItem,
  resetScrollTop,
  states,
})

const Container = resolveDynamicComponent(props.containerElement)
const Inner = resolveDynamicComponent(props.innerElement)
</script>

<template>
  <div :key="0" :class="ns.b()">
    <component
      :is="Container"
      ref="containerRef"
      :key="0"
      :class="[ns.e('container'), className]"
      :style="containerStyle"
      @scroll="handleScroll"
    >
      <component :is="Inner" ref="innerRef" :class="ns.e('inner')" :style="innerStyle">
        <template v-if="itemsCount > 0 && $slots.default">
          <slot
            v-for="i in itemsToRender[1]! - itemsToRender[0]! + 1"
            :key="i + itemsToRender[0]!"
            :data="data"
            :index="i + itemsToRender[0]! - 1"
            :is-scrolling="useIsScrolling ? states.isScrolling : undefined"
            :style="getItemStyle(i + itemsToRender[0]! - 1)"
          />
        </template>
      </component>
    </component>
    <NVirtualScrollbar
      ref="scrollbarRef"
      :client-size="clientSize"
      :layout="layout"
      :always-on="scrollbarAlwaysOn"
      :ratio="(Number(clientSize) / totalSize) * 100"
      :scroll-from="states.scrollOffset / (totalSize - Number(clientSize))"
      :total="itemsCount"
      @scroll="handleScrollbarScroll"
    />
  </div>
</template>
