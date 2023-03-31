<script setup lang="ts">
import { provide, reactive } from 'vue'

import { SYNC_SCROLL_INJECTION_KEY } from './tokens'

const panelList: HTMLElement[] = []

function addEl(el: HTMLElement) {
  console.log('addEl', el)
  addEvents(el)
  panelList.push(el)
}

function removeEl(el: HTMLElement) {
  console.log('removeEl', el)
  removeEvents(el)
  panelList.splice(panelList.indexOf(el), 1)
}

function handleScroll(event: Event) {
  const panel = event.target as HTMLElement

  console.log('handleScroll', panel)

  syncScrollPositions(panel)
}

function syncScrollPositions(scrolledPane: HTMLElement) {
  const { scrollLeft, scrollWidth, clientWidth } = scrolledPane

  panelList.forEach((pane) => {
    /* For all panes beside the currently scrolling one */
    if (scrolledPane !== pane) {
      /* Remove event listeners from the node that we'll manipulate */
      removeEvents(pane)
      syncScrollPosition({ scrollLeft, scrollWidth, clientWidth }, pane)
      /* Re-attach event listeners after we're done scrolling */
      window.requestAnimationFrame(() => {
        addEvents(pane)
      })
    }
  })
}

interface Props {
  scrollLeft: number
  scrollWidth: number
  clientWidth: number
}

function syncScrollPosition({ scrollLeft, scrollWidth, clientWidth }: Props, pane: HTMLElement) {
  const scrollLeftOffset = scrollWidth - clientWidth

  /* Calculate the actual pane height */
  const paneWidth = pane.scrollWidth - clientWidth

  if (scrollLeftOffset > 0) {
    pane.scrollLeft = (paneWidth * scrollLeft) / scrollLeftOffset
  }
}

function addEvents(el: HTMLElement) {
  el.addEventListener('scroll', handleScroll)
}

function removeEvents(el: HTMLElement) {
  el.removeEventListener('scroll', handleScroll)
}

provide(
  SYNC_SCROLL_INJECTION_KEY,
  reactive({
    addEl,
    removeEl,
  }),
)
</script>

<template>
  <slot />
</template>
