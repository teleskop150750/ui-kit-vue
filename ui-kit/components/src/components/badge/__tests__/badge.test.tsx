import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import NBadge from '../src/NBadge.vue'

const AXIOM = 'Rem is the best girl'

describe('NBadge.vue', () => {
  test('render text & class', () => {
    const wrapper = mount(() => (
      <NBadge
        v-slots={{
          default: () => AXIOM,
        }}
      />
    ))

    expect(wrapper.text()).toEqual(AXIOM)

    const { vm } = wrapper

    expect(vm.$el.classList.contains('n-badge')).toEqual(true)
    expect(vm.$el.classList.contains('n-badge__close')).toEqual(false)
  })

  test('type', () => {
    const wrapper = mount(() => <NBadge type="success" />)
    const { vm } = wrapper

    expect(vm.$el.classList.contains('n-badge--appearance-soft-primary')).toEqual(true)
  })

  test('closable', async () => {
    const wrapper = mount(() => <NBadge closable={true} />)
    const comp = wrapper.getComponent(NBadge)
    const closeBtn = comp.find('.n-badge .n-badge__close')

    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(comp.emitted().close).toBeTruthy()
  })

  test('closeTransition', () => {
    const wrapper = mount(() => <NBadge closeTransition={true} />)
    const { vm } = wrapper

    expect(vm.$el.classList.contains('md-fade-center')).toEqual(false)
  })

  test('color', () => {
    const wrapper = mount(() => <NBadge color="rgb(0, 0, 0)" />)
    const { vm } = wrapper

    expect(vm.$el.style.backgroundColor).toEqual('rgb(0, 0, 0)')
  })

  // should also support large size
  test('size', () => {
    const wrapper = mount(() => <NBadge size="large" />)
    const { vm } = wrapper
    const el = vm.$el

    expect(el.className.includes('n-badge--size-large')).toEqual(true)
    expect(el.className.includes('n-badge--size-default')).toEqual(false)
    expect(el.className.includes('n-badge--size-small')).toEqual(false)
  })
})
