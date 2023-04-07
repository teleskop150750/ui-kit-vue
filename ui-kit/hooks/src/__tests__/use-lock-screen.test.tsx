import { hasClass } from '@nado/ui-kit-utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick, onMounted, ref } from 'vue'

import { useLockScreen } from '../use-lock-screen'
import { useNamespace } from '../use-namespace'

const classes = 'n-popup-parent--hidden'

const Comp = defineComponent({
  setup() {
    const flag = ref(false)

    useLockScreen(flag)
    onMounted(() => {
      flag.value = true
    })

    return () => undefined
  },
})

describe('useLockScreen', () => {
  it('should lock screen when trigger is true', async () => {
    const wrapper = mount({
      setup: () => () => <Comp />,
    })

    await nextTick()
    expect(hasClass(document.body, classes)).toBe(true)

    wrapper.unmount()
    await nextTick()

    setTimeout(() => {
      expect(hasClass(document.body, classes)).toBe(false)
    }, 250)
  })

  it('should cleanup when unmounted', async () => {
    const shouldRender = ref(true)

    mount({
      setup: () => () => shouldRender.value ? <Comp /> : undefined,
    })

    await nextTick()

    expect(hasClass(document.body, classes)).toBe(true)

    shouldRender.value = false
    await nextTick()

    setTimeout(() => {
      expect(hasClass(document.body, classes)).toBe(false)
    }, 250)
  })

  it('should render a different namespace than the given one', async () => {
    const namespace = 'n'
    const wrapper = mount({
      setup() {
        const ns = useNamespace('lock')
        const trigger = ref(false)

        useLockScreen(trigger, { ns })
        onMounted(() => {
          trigger.value = true
        })

        return () => () => undefined
      },
    })

    mount(() => wrapper)

    await nextTick()
    expect(hasClass(document.body, `${namespace}-lock-parent--hidden`)).toBe(true)

    wrapper.unmount()
  })
})
