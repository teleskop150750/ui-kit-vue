import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, inject, nextTick } from 'vue'

import NPopper from '../src/NPopper.vue'
import { POPPER_INJECTION_KEY } from '../src/tokens'

const AXIOM = 'rem is the best girl'

const TestChild = defineComponent({
  setup() {
    const { contentRef } = inject(POPPER_INJECTION_KEY, undefined)!

    return () => <div ref={contentRef}>{AXIOM}</div>
  },
})

describe('<NPopper />', () => {
  it('should be able to provide instance to its children', async () => {
    const wrapper = mount(NPopper as any, {
      slots: {
        default: TestChild,
      },
    })

    await nextTick()

    expect(wrapper.vm.contentRef).not.toBe(null)
    expect(wrapper.vm.contentRef!.innerHTML).toBe(AXIOM)
  })
})
