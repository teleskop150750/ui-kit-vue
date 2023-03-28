<script setup lang="ts">
import { useNamespace } from '@ui/hooks'
import { SCROLLBAR_INJECTION_KEY } from '@ui/tokens'
import { type Nullable, stop, throwError } from '@ui/utils'
import { isClient, useEventListener } from '@vueuse/core'
import { computed, inject, onBeforeUnmount, type Ref, ref, toRef } from 'vue'

import { nThumbProps } from './thumb.model'
import { BAR_MAP, renderThumbStyle } from './util'

const props = defineProps(nThumbProps)

const scrollbar = inject(SCROLLBAR_INJECTION_KEY)
const ns = useNamespace('scrollbar')

if (!scrollbar) {
  throwError('NThumb', 'can not inject scrollbar context')
}

const barRef = ref() as Ref<HTMLDivElement>
const thumbRef = ref() as Ref<HTMLDivElement>
const thumbState = ref<Partial<Record<'X' | 'Y', number>>>({})
const visible = ref(false)

let cursorDown = false
let cursorLeave = false

// eslint-disable-next-line unicorn/no-null
let originalOnSelectStart: Nullable<GlobalEventHandlers['onselectstart']> = isClient ? document.onselectstart : null

const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])

const thumbStyle = computed(() =>
  renderThumbStyle({
    move: props.move,
    size: props.size,
    bar: bar.value,
  }),
)

const offsetRatio = computed(
  () =>
    // offsetRatioX = original width of thumb / current width of thumb / ratioX
    // offsetRatioY = original height of thumb / current height of thumb / ratioY
    // burRef height = wrap height - GAP
    barRef.value[bar.value.offset] ** 2 /
    scrollbar.wrapElement[bar.value.scrollSize] /
    props.ratio /
    thumbRef.value[bar.value.offset],
)

const barClasses = [ns.e('bar'), ns.eType('bar', 'axis', bar.value.key)]

function handleMouseDownThumb(evt: MouseEvent) {
  // prevent click event of middle and right button
  stop(evt)

  if (evt.ctrlKey || [1, 2].includes(evt.button)) {
    return
  }

  window.getSelection()?.removeAllRanges()
  startDrag(evt)

  const element = evt.currentTarget as HTMLElement

  if (!element) {
    return
  }

  thumbState.value[bar.value.axis] =
    element[bar.value.offset] - (evt[bar.value.client] - element.getBoundingClientRect()[bar.value.direction])
}

function handleMouseDownTrack(evt: MouseEvent) {
  if (!thumbRef.value || !barRef.value || !scrollbar || !scrollbar.wrapElement) {
    return
  }

  const target = evt.target as HTMLElement
  const offset = Math.abs(target.getBoundingClientRect()[bar.value.direction] - evt[bar.value.client])
  const thumbHalf = thumbRef.value[bar.value.offset] / 2
  const thumbPositionPercentage = ((offset - thumbHalf) * 100 * offsetRatio.value) / barRef.value[bar.value.offset]

  scrollbar.wrapElement[bar.value.scroll] =
    (thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]) / 100
}

function startDrag(evt: MouseEvent) {
  evt.stopImmediatePropagation()
  cursorDown = true
  document.addEventListener('mousemove', handleMouseMoveDocument)
  document.addEventListener('mouseup', handleMouseUpDocument)
  originalOnSelectStart = document.onselectstart
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  document.onselectstart = () => false
}

function handleMouseMoveDocument(evt: MouseEvent) {
  if (!barRef.value || !thumbRef.value) {
    return
  }

  if (cursorDown === false) {
    return
  }

  const prevPage = thumbState.value[bar.value.axis]

  if (!prevPage || !scrollbar) {
    return
  }

  const offset = (barRef.value.getBoundingClientRect()[bar.value.direction] - evt[bar.value.client]) * -1
  const thumbClickPosition = thumbRef.value[bar.value.offset] - prevPage

  const thumbPositionPercentage =
    ((offset - thumbClickPosition) * 100 * offsetRatio.value) / barRef.value[bar.value.offset]

  scrollbar.wrapElement[bar.value.scroll] =
    (thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]) / 100
}

function handleMouseUpDocument() {
  cursorDown = false
  thumbState.value[bar.value.axis] = 0
  document.removeEventListener('mousemove', handleMouseMoveDocument)
  document.removeEventListener('mouseup', handleMouseUpDocument)
  restoreOnselectstart()

  if (cursorLeave) {
    visible.value = false
  }
}

function handleMouseMoveScrollbar() {
  cursorLeave = false
  // eslint-disable-next-line unicorn/explicit-length-check
  visible.value = Boolean(props.size)
}

function handleMouseLeaveScrollbar() {
  cursorLeave = true
  visible.value = cursorDown
}

onBeforeUnmount(() => {
  restoreOnselectstart()
  document.removeEventListener('mouseup', handleMouseUpDocument)
})

function restoreOnselectstart() {
  if (document.onselectstart !== originalOnSelectStart) {
    // eslint-disable-next-line unicorn/prefer-add-event-listener, unicorn/no-null
    document.onselectstart = originalOnSelectStart || null
  }
}

useEventListener(toRef(scrollbar, 'scrollbarElement'), 'mousemove', handleMouseMoveScrollbar)

useEventListener(toRef(scrollbar, 'scrollbarElement'), 'mouseleave', handleMouseLeaveScrollbar)
</script>

<script lang="ts">
export default {
  name: 'NScrollbarThumb',
}
</script>

<template>
  <Transition :name="ns.s('fade')">
    <div v-show="always || visible" ref="barRef" :class="barClasses" @mousedown="handleMouseDownTrack">
      <div ref="thumbRef" :class="ns.e('thumb')" :style="thumbStyle" @mousedown="handleMouseDownThumb" />
    </div>
  </Transition>
</template>
