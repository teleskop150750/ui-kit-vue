<script setup lang="ts">
import { useNamespace } from '@nado/ui-kit-hooks'
import { cAF, type Nillable, type Nullable, rAF } from '@nado/ui-kit-utils'
import { computed, type CSSProperties, onBeforeUnmount, reactive, ref, unref, watch } from 'vue'

import { BAR_MAP } from '../../NScrollbar'
import { HORIZONTAL, SCROLLBAR_MIN_SIZE, ScrollbarDirKey } from './defaults'
import { virtualScrollbarProps } from './NVirtualScrollbar.model'
import { renderThumbStyle } from './utils'

const props = defineProps(virtualScrollbarProps)
const emit = defineEmits(['scroll', 'startMove', 'stopMove'])

const nsVirtualScrollbar = useNamespace('virtual-scrollbar')

// DOM refs
const trackRef = ref<HTMLElement>()
const thumbRef = ref<HTMLElement>()

// local variables

let frameHandle: Nillable<number> = undefined
// eslint-disable-next-line unicorn/no-null
let onSelectstartStore: Nullable<typeof document.onselectstart> = null

// data
type State = { isDragging: boolean; traveled: number } & Record<string, unknown>

const state = reactive<State>({
  isDragging: false,
  traveled: 0,
})

const bar = computed(() => BAR_MAP[props.layout])
const trackSize = computed(() => props.clientSize)

const trackStyle = computed<CSSProperties>(() => ({
  position: 'absolute',
  width: `${HORIZONTAL === props.layout ? trackSize.value : props.scrollbarSize}px`,
  height: `${HORIZONTAL === props.layout ? props.scrollbarSize : trackSize.value}px`,
  [ScrollbarDirKey[props.layout]]: '0',
  right: '0',
  bottom: '0',
  borderRadius: '8px',
}))

const thumbSize = computed(() => {
  const { ratio, clientSize } = props

  if (ratio >= 100) {
    return Number.POSITIVE_INFINITY
  }

  if (ratio >= 50) {
    return (ratio * clientSize) / 100
  }

  const SCROLLBAR_MAX_SIZE = clientSize / 3

  return Math.floor(Math.min(Math.max(ratio * clientSize, SCROLLBAR_MIN_SIZE), SCROLLBAR_MAX_SIZE))
})

const thumbStyle = computed<CSSProperties>(() => {
  if (!Number.isFinite(thumbSize.value)) {
    return {
      display: 'none',
    }
  }

  const size = `${thumbSize.value}px`
  const style: CSSProperties = renderThumbStyle(
    {
      bar: bar.value,
      size,
      move: state.traveled,
    },
    props.layout,
  )

  return style
})

const totalSteps = computed(() => Math.floor(props.clientSize - thumbSize.value))

function attachEvents() {
  window.addEventListener('mousemove', handleMouseMoveWindow)
  window.addEventListener('mouseup', handleMouseUpWindow)
  const thumbEl = unref(thumbRef)

  if (!thumbEl) {
    return
  }

  onSelectstartStore = document.onselectstart
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  document.onselectstart = () => false
}

function detachEvents() {
  window.removeEventListener('mousemove', handleMouseMoveWindow)
  window.removeEventListener('mouseup', handleMouseUpWindow)
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  document.onselectstart = onSelectstartStore

  // eslint-disable-next-line unicorn/no-null
  onSelectstartStore = null
}

function handleMouseDownThumb(evt: MouseEvent | TouchEvent | Event) {
  evt.stopImmediatePropagation()

  if ((evt as KeyboardEvent).ctrlKey || [1, 2].includes((evt as MouseEvent).button)) {
    return
  }

  state.isDragging = true

  const currentTarget = evt.currentTarget as HTMLElement
  const offset = currentTarget[bar.value.offset]
  const client = (evt as MouseEvent)[bar.value.client]
  const direction = currentTarget.getBoundingClientRect()[bar.value.direction]

  state[bar.value.axis] = offset - (client - direction)

  emit('startMove')
  attachEvents()
}

function handleMouseUpWindow() {
  state.isDragging = false
  state[bar.value.axis] = 0
  emit('stopMove')
  detachEvents()
}

function handleMouseMoveWindow(evt: MouseEvent) {
  const { isDragging } = state

  if (!isDragging) {
    return
  }

  if (!thumbRef.value || !trackRef.value) {
    return
  }

  const prevPage = state[bar.value.axis]

  if (!prevPage) {
    return
  }

  if (frameHandle !== undefined) {
    cAF(frameHandle)
  }

  // используя смещение текущего трека top/left - текущий
  // указатель clientY/clientX, чтобы получить относительное положение указателя на трек
  const start = trackRef.value.getBoundingClientRect()[bar.value.direction]
  const client = evt[bar.value.client]
  const offset = client - start
  // найдите место, на которое был нажат thumb.
  const thumbClickPosition = thumbRef.value[bar.value.offset] - (prevPage as number)
  /**
   *  +--------------+                                   +--------------+
   *  |              -  <--------- thumb.offsetTop       |              |
   *  |             |+|             <--+                 |              |
   *  |              -                 |                 |              |
   *  |   Content    |                 |                 |              |
   *  |              |                 |                 |              |
   *  |              |                 |                 |              |
   *  |              |                 |                 |              -
   *  |              |                 +-->              |             |+|
   *  |              |                                   |              -
   *  +--------------+                                   +--------------+
   */
  // используя текущую позицию - предыдущую позицию для
  const distance = offset - thumbClickPosition

  // узнать, сколько всего шагов.
  // зазор 2 сверху, 2 снизу, всего 4.
  // используя totalSteps ÷ totalSize, получаем размер каждого шага * расстояние, чтобы получить новое
  // смещение прокрутки для scrollTo
  frameHandle = rAF(() => {
    state.traveled = Math.max(0, Math.min(distance, totalSteps.value))
    emit('scroll', distance, totalSteps.value)
  })
}

function handleMouseDownTrack(evt: MouseEvent) {
  const target = evt.target as HTMLElement
  const direction = target.getBoundingClientRect()[bar.value.direction]
  const client = evt[bar.value.client]

  const offset = Math.abs(direction - client)
  const thumbCenter = thumbRef.value![bar.value.offset] / 2
  const distance = offset - thumbCenter

  state.traveled = Math.max(0, Math.min(distance, totalSteps.value))
  emit('scroll', distance, totalSteps.value)
}

watch(
  () => props.scrollFrom,
  (val) => {
    if (state.isDragging) {
      return
    }

    /**
     *  это просто отображение текущего смещения полосы прокрутки
     *
     *  formula 1:
     *    v = scrollOffset / (estimatedTotalSize - clientSize)
     *    traveled = v * (clientSize - thumbSize) --> v * totalSteps
     *
     *  formula 2:
     *    traveled = (v * clientSize) / (clientSize / totalSteps)
     *    --> (v * clientSize) * (totalSteps / clientSize)
     *    --> v * totalSteps
     */
    state.traveled = Math.ceil(val * totalSteps.value)
  },
)

onBeforeUnmount(() => {
  detachEvents()
})
</script>

<template>
  <div
    ref="trackRef"
    role="presentation"
    :class="[nsVirtualScrollbar.b(), (alwaysOn || state.isDragging) && nsVirtualScrollbar.m('always-on')]"
    :style="trackStyle"
    @mousedown.stop.prevent="handleMouseDownTrack"
  >
    <div
      ref="thumbRef"
      :class="nsVirtualScrollbar.e('thumb')"
      :style="thumbStyle"
      @mousedown.stop.prevent="handleMouseDownThumb"
    />
  </div>
</template>

<style>
@import url('@nado/ui-kit-theme/src/components/n-virtual-list/index.css');
</style>
