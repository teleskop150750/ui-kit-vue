<script setup lang="ts">
import { useNamespace } from '@ui/hooks'
import { SCROLLBAR_INJECTION_KEY } from '@ui/tokens'
import { addUnit, debugWarn, isNumber, isObject } from '@ui/utils'
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, onUpdated, provide, reactive, ref, type StyleValue, watch } from 'vue'

import type { NBarInstance } from './bar.model'
import NBar from './bar.vue'
import { nScrollbarEmits, nScrollbarProps } from './scrollbar.model'
import { GAP } from './util'

const props = defineProps(nScrollbarProps)

const emit = defineEmits(nScrollbarEmits)

const COMPONENT_NAME = 'NScrollbar'

const ns = useNamespace('scrollbar')

let stopResizeObserver: (() => void) | undefined = undefined
// TODO: Зачем resize window
// let stopResizeListener: (() => void) | undefined = undefined

const scrollbarRef = ref<HTMLDivElement>()
const wrapRef = ref<HTMLDivElement>()
const resizeRef = ref<HTMLDivElement>()
const barRef = ref<NBarInstance>()
const thumbWidth = ref('0')
const thumbHeight = ref('0')
const ratioY = ref(1)
const ratioX = ref(1)

const wrapClasses = [props.wrapClass, ns.e('wrap'), ns.eIs('wrap', 'hidden-default', !props.native)]
const resizeClasses = [ns.e('view'), props.viewClass]

const style = computed<StyleValue>(() => {
  const acc = {} as Record<string, string | number | undefined>

  if (props.height) {
    acc.height = addUnit(props.height)
  }

  if (props.maxHeight) {
    acc.maxHeight = addUnit(props.maxHeight)
  }

  return [props.wrapStyle, acc]
})

function handleScroll() {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value)
    emit('scroll', {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    })
  }
}

const scrollTo: (x: number, y: number) => void | ((options: ScrollToOptions) => void) = (arg1, arg2) => {
  if (!wrapRef.value) {
    return
  }

  if (isObject(arg1)) {
    wrapRef.value.scrollTo(arg1 as ScrollToOptions)
  } else if (isNumber(arg1) && isNumber(arg2)) {
    wrapRef.value.scrollTo(arg1, arg2)
  }
}

function setScrollTop(val: number) {
  if (!isNumber(val)) {
    debugWarn(COMPONENT_NAME, 'value must be a number')

    return
  }

  if (!wrapRef.value) {
    return
  }

  wrapRef.value.scrollTop = val
}

function setScrollLeft(val: number) {
  if (!isNumber(val)) {
    debugWarn(COMPONENT_NAME, 'value must be a number')

    return
  }

  if (!wrapRef.value) {
    return
  }

  wrapRef.value.scrollLeft = val
}

function update() {
  if (!wrapRef.value) {
    return
  }

  const calcGAP = calcGapSize()

  const barYSize = wrapRef.value.offsetHeight - calcGAP
  const barXSize = wrapRef.value.offsetWidth - calcGAP

  const originalThumbYSize = barYSize ** 2 / wrapRef.value.scrollHeight
  const originalThumbXSize = barXSize ** 2 / wrapRef.value.scrollWidth

  const calculatedThumbYSize = Math.max(originalThumbYSize, props.minSize)
  const calculatedThumbXSize = Math.max(originalThumbXSize, props.minSize)

  const ratioOriginalYSize = originalThumbYSize / (barYSize - originalThumbYSize)
  const ratioCalculatedYSize = calculatedThumbYSize / (barYSize - calculatedThumbYSize)

  ratioY.value = ratioOriginalYSize / ratioCalculatedYSize

  const ratioOriginalXSize = originalThumbXSize / (barXSize - originalThumbXSize)
  const ratioCalculatedXSize = calculatedThumbXSize / (barXSize - calculatedThumbXSize)

  ratioX.value = ratioOriginalXSize / ratioCalculatedXSize
  thumbHeight.value =
    Math.round(calculatedThumbYSize) + calcGAP < barYSize ? `${Math.round(calculatedThumbYSize)}px` : ''
  thumbWidth.value =
    Math.round(calculatedThumbXSize) + calcGAP < barXSize ? `${Math.round(calculatedThumbXSize)}px` : ''
}

function calcGapSize() {
  if (!wrapRef.value) {
    return 0
  }

  const isVertical = wrapRef.value.scrollHeight > wrapRef.value.offsetHeight
  const isHorizontal = wrapRef.value.scrollWidth > wrapRef.value.offsetWidth

  return isVertical && isHorizontal ? GAP : 0
}

watch(
  () => props.noResize,
  (noResize) => {
    if (noResize) {
      stopResizeObserver?.()
      // stopResizeListener?.()
    } else {
      ;({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update))
      // stopResizeListener = useEventListener('resize', update)
    }
  },
  { immediate: true },
)

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native) {
      nextTick(() => {
        update()

        if (wrapRef.value) {
          barRef.value?.handleScroll(wrapRef.value)
        }
      })
    }
  },
)

provide(
  SCROLLBAR_INJECTION_KEY,
  reactive({
    scrollbarElement: scrollbarRef,
    wrapElement: wrapRef,
  }),
)

onMounted(() => {
  if (!props.native) {
    nextTick(() => {
      update()
    })
  }
})

onUpdated(() => update())

defineExpose({
  /** @description scrollbar wrap ref */
  wrapRef,
  /** @description update scrollbar state manually */
  update,
  /** @description scrolls to a particular set of coordinates */
  scrollTo,
  /** @description set distance to scroll top */
  setScrollTop,
  /** @description set distance to scroll left */
  setScrollLeft,
  /** @description handle scroll event */
  handleScroll,
})
</script>

<script lang="ts">
export default {
  name: 'NScrollbar',
}
</script>

<template>
  <div ref="scrollbarRef" :class="ns.b()">
    <div ref="wrapRef" :class="wrapClasses" :style="style" @scroll="handleScroll">
      <component :is="tag" ref="resizeRef" :class="resizeClasses" :style="viewStyle">
        <slot />
      </component>

      <template v-if="!native">
        <NBar
          ref="barRef"
          :height="thumbHeight"
          :width="thumbWidth"
          :always="always"
          :ratio-x="ratioX"
          :ratio-y="ratioY"
        />
      </template>
    </div>
  </div>
</template>
