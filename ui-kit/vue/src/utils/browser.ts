import { isClient } from '@vueuse/core'

export function isFirefox(): boolean {
  return isClient && /firefox/i.test(window.navigator.userAgent)
}
