import { isClient } from '@vueuse/core'

import type { Nillable } from '../typescript'

const globalNodes: HTMLElement[] = []
let target: Nillable<HTMLElement> = !isClient ? undefined : document.body

export function createGlobalNode(id?: string) {
  const el = document.createElement('div')

  if (id !== undefined) {
    el.setAttribute('id', id)
  }

  target!.append(el)
  globalNodes.push(el)

  return el
}

export function removeGlobalNode(el: HTMLElement) {
  globalNodes.splice(globalNodes.indexOf(el), 1)
  el.remove()
}

export function changeGlobalNodesTarget(el: HTMLElement) {
  if (el === target) {
    return
  }

  target = el

  globalNodes.forEach((_el) => {
    if (_el.contains(target!) === false) {
      target!.append(_el)
    }
  })
}
