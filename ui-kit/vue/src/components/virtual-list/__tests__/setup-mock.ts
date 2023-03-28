/* eslint-disable no-invalid-this */
import { defineGetter } from '@ui/test-utils/define-getter'

export const setupMock = () => {
  const clientWidth = defineGetter(
    HTMLElement.prototype,
    'clientWidth',
    function f() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      return Number.parseInt(this.style.width) || 0
    },
    0,
  )

  const clientHeight = defineGetter(
    HTMLElement.prototype,
    'clientHeight',
    function f() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      return Number.parseInt(this.style.height) || 0
    },
    0,
  )

  const scrollHeight = defineGetter(HTMLElement.prototype, 'scrollHeight', () => Number.MAX_SAFE_INTEGER, 0)

  const scrollWidth = defineGetter(HTMLElement.prototype, 'scrollWidth', () => Number.MAX_SAFE_INTEGER, 0)

  // clean up function
  return () => {
    clientWidth()
    clientHeight()
    scrollHeight()
    scrollWidth()
  }
}
