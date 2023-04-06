import { isClient } from './shared'

export function isFirefox(): boolean {
  return isClient && /firefox/i.test(window.navigator.userAgent)
}
