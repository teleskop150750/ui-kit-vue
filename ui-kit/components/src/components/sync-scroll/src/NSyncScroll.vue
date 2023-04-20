<script setup lang="ts">
import { isArray } from '@nado/ui-kit-utils'
import type { Arrayable } from 'vitest'
import { onBeforeUnmount, provide } from 'vue'

import { SYNC_SCROLL_INJECTION_KEY } from './tokens'

interface Panel {
  el: Element
  x: number
  y: number
  handler?: undefined | (() => void)
}

const panelList: Panel[] = []

function addElement(elements: Arrayable<Element>) {
  const list = isArray(elements) ? elements : [elements]

  list.forEach((el) => {
    const newPanel: Panel = {
      x: 0,
      y: 0,
      el,
    }

    newPanel.handler = getHandleScroll(newPanel)

    newPanel.el.addEventListener('scroll', newPanel.handler, false)
    panelList.push(newPanel)
  })
}

function removeElement(el: Element) {
  const foundPanel = panelList.find((panel) => panel.el === el)

  if (!foundPanel) {
    return
  }

  if (foundPanel.handler) {
    foundPanel.el.removeEventListener('scroll', foundPanel.handler, false)
  }

  panelList.splice(panelList.indexOf(foundPanel), 1)
}

function clearPanelList() {
  panelList.forEach((el) => {
    el.x = 0
    el.y = 0

    if (el.handler) {
      el.el.removeEventListener('scroll', el.handler, false)
    }

    el.handler = undefined
  })
  panelList.length = 0
}

function getHandleScroll(currentPanel: Panel) {
  return () => {
    const { scrollWidth, scrollHeight, clientWidth, clientHeight, scrollLeft, scrollTop } = currentPanel.el

    let scrollX = scrollLeft
    let scrollY = scrollTop
    const xRate = scrollX / (scrollWidth - clientWidth)
    const yRate = scrollY / (scrollHeight - clientHeight)

    const updateX = scrollX !== currentPanel.x
    const updateY = scrollY !== currentPanel.y

    currentPanel.x = scrollX
    currentPanel.y = scrollY

    if (!updateX && !updateY) {
      return
    }

    panelList.forEach((otherEl) => {
      window.requestAnimationFrame(() => {
        if (otherEl.el !== currentPanel.el) {
          const {
            scrollLeft: otherScrollX,
            scrollTop: otherScrollY,
            scrollWidth: otherScrollWidth,
            scrollHeight: otherScrollHeight,
            clientWidth: otherClientWidth,
            clientHeight: otherClientHeight,
          } = otherEl.el

          scrollX = Math.round(xRate * (otherScrollWidth - otherClientWidth))
          otherEl.x = scrollX

          if (updateX && Math.round(otherScrollX - scrollX)) {
            otherEl.el.scrollLeft = scrollX
          }

          scrollY = Math.round(yRate * (otherScrollHeight - otherClientHeight))
          otherEl.y = scrollY

          if (updateY && Math.round(otherScrollY - scrollY)) {
            otherEl.el.scrollTop = scrollY
          }
        }
      })
    })
  }
}

provide(SYNC_SCROLL_INJECTION_KEY, {
  addElement,
  removeElement,
})

defineExpose({
  addElement,
  removeElement,
})

onBeforeUnmount(() => {
  clearPanelList()
})
</script>

<template>
  <slot />
</template>
