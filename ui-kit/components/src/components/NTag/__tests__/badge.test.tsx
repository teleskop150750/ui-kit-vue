import { mount } from '@vue/test-utils'

import NTag from '../src/NTag.vue'

const AXIOM = 'Rem is the best girl'

describe('NTag.vue', () => {
  test('render text & class', () => {
    const wrapper = mount(() => (
      <NTag
        v-slots={{
          default: () => AXIOM,
        }}
      />
    ))

    expect(wrapper.text()).toEqual(AXIOM)

    const { vm } = wrapper

    expect(vm.$el.classList.contains('n-tag')).toEqual(true)
    expect(vm.$el.classList.contains('n-tag__close')).toEqual(false)
  })

  test('type', () => {
    const wrapper = mount(() => <NTag type="success" />)
    const { vm } = wrapper

    expect(vm.$el.classList.contains('n-tag--appearance-soft-primary')).toEqual(true)
  })

  test('closable', async () => {
    const wrapper = mount(() => <NTag closable={true} />)
    const comp = wrapper.getComponent(NTag)
    const closeBtn = comp.find('.n-tag .n-tag__close')

    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(comp.emitted().close).toBeTruthy()
  })

  test('closeTransition', () => {
    const wrapper = mount(() => <NTag closeTransition={true} />)
    const { vm } = wrapper

    expect(vm.$el.classList.contains('md-fade-center')).toEqual(false)
  })

  test('color', () => {
    const wrapper = mount(() => <NTag color="rgb(0, 0, 0)" />)
    const { vm } = wrapper

    expect(vm.$el.style.backgroundColor).toEqual('rgb(0, 0, 0)')
  })

  // should also support large size
  test('size', () => {
    const wrapper = mount(() => <NTag size="large" />)
    const { vm } = wrapper
    const el = vm.$el

    expect(el.className.includes('n-tag--size-large')).toEqual(true)
    expect(el.className.includes('n-tag--size-default')).toEqual(false)
    expect(el.className.includes('n-tag--size-small')).toEqual(false)
  })
})
