import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import NBadge from '../src/NBadge.vue'

const AXIOM = 'Rem is the best girl'

describe('Badge', () => {
  it('has value', () => {
    const wrapper = mount(() => <NBadge value={80} />)

    expect(wrapper.find('.n-badge__content').text()).toEqual('80')
  })

  it('is fixed', () => {
    const wrapper = mount(() => (
      <NBadge
        v-slots={{
          default: () => AXIOM,
        }}
      />
    ))

    expect(wrapper.find('.n-badge__content--is-fixed').exists()).toBe(true)
    expect(wrapper.find('.n-badge').text()).toBe(AXIOM)
  })

  it('is dot', () => {
    const wrapper = mount(() => (
      <NBadge
        isDot={true}
        v-slots={{
          default: () => AXIOM,
        }}
      />
    ))

    expect(wrapper.find('.n-badge__content--is-dot').exists()).toBe(true)
    expect(wrapper.find('.n-badge__content--appearance-danger').exists()).toBe(true)
  })

  it('is dot with type', () => {
    const wrapper = mount(() => (
      <NBadge
        isDot={true}
        appearance={'success'}
        v-slots={{
          default: () => AXIOM,
        }}
      />
    ))

    expect(wrapper.find('.n-badge__content--is-dot').exists()).toBe(true)
    expect(wrapper.find('.n-badge__content--appearance-success').exists()).toBe(true)
  })

  it('max', async () => {
    const badgeValue = ref(200)
    const wrapper = mount(() => <NBadge max={100} value={badgeValue.value} />)

    expect(wrapper.find('.n-badge__content').text()).toEqual('100+')
    badgeValue.value = 80
    await nextTick()
    expect(wrapper.find('.n-badge__content').text()).toEqual('80')
  })
})
