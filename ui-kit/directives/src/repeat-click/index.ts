import { isFunction } from '@nado/ui-kit-utils'
import type { ObjectDirective } from 'vue'

export const REPEAT_INTERVAL = 100
export const REPEAT_DELAY = 600

export interface RepeatClickOptions {
  interval?: number
  delay?: number
  handler: (...args: unknown[]) => unknown
}

export const vRepeatClick: ObjectDirective<HTMLElement, RepeatClickOptions | RepeatClickOptions['handler']> = {
  beforeMount(element, binding) {
    const { value } = binding
    const { interval = REPEAT_INTERVAL, delay = REPEAT_DELAY } = isFunction(value) ? {} : value

    let intervalId: ReturnType<typeof setInterval> | undefined
    let delayId: ReturnType<typeof setTimeout> | undefined

    const handler = () => (isFunction(value) ? value() : value.handler())

    function clear() {
      if (delayId) {
        clearTimeout(delayId)
        delayId = undefined
      }

      if (intervalId) {
        clearInterval(intervalId)
        intervalId = undefined
      }
    }

    element.addEventListener('mousedown', (evt: MouseEvent) => {
      if (evt.button !== 0) {
        return
      }

      clear()
      handler()

      document.addEventListener('mouseup', () => clear(), {
        once: true,
      })

      delayId = setTimeout(() => {
        intervalId = setInterval(() => {
          handler()
        }, interval)
      }, delay)
    })
  },
}
