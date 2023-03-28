import normalizeWheel, { type NormalizedWheelEvent } from 'normalize-wheel-es'
import type { DirectiveBinding, ObjectDirective } from 'vue'

function mousewheel(element: HTMLElement, callback: (e: WheelEvent, normalized: NormalizedWheelEvent) => void) {
  if (element && element.addEventListener) {
    const fn = function fn(this: HTMLElement, event: WheelEvent) {
      const normalized = normalizeWheel(event)

      // eslint-disable-next-line no-invalid-this
      callback && Reflect.apply(callback, this, [event, normalized])
    }

    element.addEventListener('wheel', fn, { passive: true })
  }
}

export const vMousewheel: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    mousewheel(el, binding.value)
  },
}
