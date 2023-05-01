import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import NOverlay from '../src/NOverlay.vue'

const AXIOM = 'Rem is the best girl'

describe('Overlay.vue', () => {
  test('render test', async () => {
    const wrapper = mount(NOverlay, {
      slots: {
        default: AXIOM,
      },
    })

    expect(wrapper.text()).toEqual(AXIOM)
    const testClass = 'test-class'

    await wrapper.setProps({
      overlayClass: testClass,
    })

    expect(wrapper.find(`.${testClass}`)).toBeTruthy()
  })

  test('should emit click event', async () => {
    const wrapper = mount(() => <NOverlay>{AXIOM}</NOverlay>)

    await wrapper.find('.n-overlay').trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })

  test('no mask', async () => {
    const mask = ref(true)
    const wrapper = mount(() => <NOverlay mask={mask.value}>{AXIOM}</NOverlay>)

    const selector = '.n-overlay'

    expect(wrapper.find(selector).exists()).toBe(true)

    mask.value = false

    await nextTick()

    expect(wrapper.find(selector).exists()).toBe(false)

    mask.value = true

    await nextTick()

    expect(wrapper.find(selector).exists()).toBe(true)
  })

  // TODO
  // test('global', async () => {
  //   const testNamespace = 'test'
  //   const callout = () => {
  //     ElMessageBox.prompt('Title', 'Description')
  //   }
  //   const wrapper = mount(() => (
  //     <NConfigProvider namespace={testNamespace}>
  //       <button onClick={callout}>{AXIOM}</button>
  //     </NConfigProvider>
  //   ))

  //   expect(document.body.querySelector(`.${testNamespace}-overlay`)).toBeNull()
  //   await wrapper.find('button').trigger('click')
  //   await nextTick()

  //   expect(document.body.querySelector(`.${testNamespace}-overlay`)).toBeDefined()
  // })
})
