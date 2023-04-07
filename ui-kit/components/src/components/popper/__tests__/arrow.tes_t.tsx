/* eslint-disable unicorn/no-null */
import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'

import NPopperArrow from '../src/NPopperArrow.vue'
import type { PopperArrowInstance } from '../src/popper-arrow.model'
import { POPPER_CONTENT_INJECTION_KEY } from '../src/tokens'

const popperContentInjection = {
  arrowRef: ref(null),
  arrowOffset: ref(0),
}

function mountArrow() {
  return mount(() => <NPopperArrow />, {
    global: {
      provide: {
        [POPPER_CONTENT_INJECTION_KEY as symbol]: popperContentInjection,
      },
    },
  }) as VueWrapper<PopperArrowInstance>
}

describe('<NPopperArrow />', () => {
  let wrapper: VueWrapper<PopperArrowInstance>

  beforeEach(() => {
    wrapper = mountArrow()

    return nextTick()
  })

  afterEach(() => {
    wrapper?.unmount()
    popperContentInjection.arrowRef.value = null
    popperContentInjection.arrowOffset.value = 0
  })

  it('should set the arrowRef after mounted', async () => {
    expect(popperContentInjection.arrowRef.value).toBe(wrapper.vm.arrowRef)
    expect(popperContentInjection.arrowOffset.value).toBe(0)
  })

  it('should update the offset after props changed', async () => {
    expect(popperContentInjection.arrowOffset.value).toBe(0)

    await wrapper.setProps({
      arrowOffset: 10,
    })

    expect(popperContentInjection.arrowOffset.value).toBe(10)
  })

  it('should unset arrowRef before unmount', async () => {
    expect(popperContentInjection.arrowRef.value).toBe(wrapper.vm.arrowRef)

    wrapper.unmount()
    expect(popperContentInjection.arrowRef.value).toBeNull()
  })
})
