import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, defineComponent, nextTick, ref } from 'vue'

import NPopperContent from '../src/NPopperContent.vue'
import type { NPopperContentInstance } from '../src/popper-content.model'
import { POPPER_INJECTION_KEY } from '../src/tokens'

const AXIOM = 'rem is the best girl'
const popperInjection = {
  triggerRef: ref(),
  popperInstanceRef: ref(),
  contentRef: ref(),
  role: computed(() => 'test-role'),
}

const TestComponent = defineComponent({
  setup() {
    return {
      contentRef: ref(),
    }
  },
  render() {
    return (
      <NPopperContent ref="contentRef" {...this.$attrs}>
        {AXIOM}
      </NPopperContent>
    )
  },
})

const mountContent = (props = {}) =>
  mount(NPopperContent as any, {
    props: {
      ...props,
    },
    slots: {
      default: AXIOM,
    },
    global: {
      provide: {
        [POPPER_INJECTION_KEY as symbol]: popperInjection,
      },
    },
  })

const mountWrappedContent = (props = {}) =>
  mount(TestComponent, {
    props: {
      ...props,
    },
    global: {
      provide: {
        [POPPER_INJECTION_KEY as symbol]: popperInjection,
      },
    },
  })

describe('<NPopperContent />', () => {
  describe('with triggerRef provided', () => {
    const triggerClasses = 'n-popper__trigger'
    let wrapper: VueWrapper<NPopperContentInstance>

    beforeEach(() => {
      const trigger = document.createElement('div')

      trigger.className = triggerClasses

      popperInjection.triggerRef.value = trigger
    })

    afterEach(() => {
      popperInjection.triggerRef.value = null
      wrapper?.unmount()
    })

    it('should mount the component correctly and set popperInstance correctly', async () => {
      wrapper = mountContent()
      await nextTick()

      expect(popperInjection.triggerRef).toBeDefined()
      expect(wrapper.html()).toContain(AXIOM)
      expect(popperInjection.popperInstanceRef.value).toBeDefined()
      expect(wrapper.classes()).toEqual(['n-popper', 'n-popper--is-dark'])
      expect(wrapper.vm.contentStyle).toHaveLength(3)
      expect(wrapper.vm.contentStyle[0]).toHaveProperty('zIndex')
      expect(wrapper.vm.contentStyle[1]).toEqual({})
      expect(wrapper.vm.contentStyle[2]).toEqual(
        expect.objectContaining({
          position: 'absolute',
          top: '0',
          left: '0',
        }),
      )
    })

    it('should be able to be pure and themed', async () => {
      wrapper = mountContent()
      await nextTick()

      await wrapper.setProps({
        pure: true,
        effect: 'custom',
      })

      expect(wrapper.classes()).toEqual(['n-popper', 'n-popper--is-pure', 'n-popper--is-custom'])
    })

    it('should be able to set customized styles', async () => {
      wrapper = mountContent()
      await nextTick()

      const style = {
        position: 'absolute',
      }

      await wrapper.setProps({
        popperStyle: style,
      })

      expect(wrapper.vm.contentStyle[1]).toEqual(style)
    })

    it('should be able to emit events', async () => {
      wrapper = mountContent()
      await nextTick()

      expect(wrapper.emitted()).not.toHaveProperty('mouseenter')
      expect(wrapper.emitted()).not.toHaveProperty('mouseleave')

      await wrapper.trigger('mouseenter')
      expect(wrapper.emitted()).toHaveProperty('mouseenter')

      await wrapper.trigger('mouseleave')
      expect(wrapper.emitted()).toHaveProperty('mouseleave')
    })

    describe('instantiate popper instance', () => {
      it('should be able to update the current instance', async () => {
        await nextTick()

        vi.spyOn(popperInjection.triggerRef.value, 'getBoundingClientRect').mockImplementation(() => ({
          bottom: 1,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
        }))

        wrapper.vm.$forceUpdate()
      })

      it('should be able to update the reference node', async () => {
        const w = mountWrappedContent()

        await nextTick()

        const { contentRef } = w.vm
        const oldInstance = contentRef.popperInstanceRef

        const newRef = document.createElement('div')

        newRef.classList.add('new-ref')

        popperInjection.triggerRef.value = newRef
        await nextTick()

        expect(contentRef.popperInstanceRef).not.toStrictEqual(oldInstance)

        popperInjection.triggerRef.value = undefined

        await nextTick()

        expect(contentRef.popperInstanceRef).toBeUndefined()
      })
    })
  })
})
