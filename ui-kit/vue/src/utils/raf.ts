import { isClient } from '@vueuse/core'

export function rAF(fn: () => void) {
  return isClient ? window.requestAnimationFrame(fn) : (setTimeout(fn, 16) as unknown as number)
}

export function cAF(handle: number) {
  return isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle)
}
