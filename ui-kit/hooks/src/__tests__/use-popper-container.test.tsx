import { config, mount, shallowMount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'

import { ID_INJECTION_KEY } from '../use-id'
import { usePopperContainer, usePopperContainerId } from '../use-popper-container'

const AXIOM = 'rem is the best girl'

const mountComponent = () =>
  shallowMount(
    defineComponent({
      setup(_, { expose }) {
        const exposes = usePopperContainer()

        expose(exposes)

        return () => <div>{AXIOM}</div>
      },
    }),
  )

describe('usePopperContainer', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should append container to the DOM root', async () => {
    const { vm } = mountComponent() as any

    await nextTick()
    const { selector } = vm

    expect(document.body.querySelector(selector.value)).toBeDefined()
  })

  it('should not append container to the DOM root', async () => {
    const { vm } = mountComponent() as any

    await nextTick()
    const { selector } = vm

    expect(document.body.querySelector(selector.value)).toBeNull()
  })
})

describe('no injection value', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('usePopperContainerId', () => {
    const wrapper = mount({
      setup() {
        const data = usePopperContainerId()

        return data
      },
    })

    expect(wrapper.vm.id).toMatch(/^n-popper-container-\d{0,4}$/)
    expect(wrapper.vm.selector).toMatch(/^#n-popper-container-\d{0,4}$/)
    expect(wrapper.vm.selector).toBe(`#${wrapper.vm.id}`)
  })
})

describe('with injection value', () => {
  beforeEach(() => {
    config.global.provide = {
      [ID_INJECTION_KEY as symbol]: {
        prefix: 1024,
        current: 0,
      },
    }
  })

  afterEach(() => {
    document.body.innerHTML = ''
    config.global.provide = {}
  })

  it('usePopperContainerId', () => {
    const wrapper = mount({
      setup() {
        const data = usePopperContainerId()

        return data
      },
    })

    expect(wrapper.vm.id).toBe('n-popper-container-1024')
    expect(wrapper.vm.selector).toBe('#n-popper-container-1024')
  })
})
