import { NIconEdit } from '@nado/ui-kit-icons-vue'
import { mount } from '@vue/test-utils'
import { defineComponent, markRaw, nextTick, type VNode } from 'vue'

import NStep from '../src/NStep.vue'
import NSteps from '../src/NSteps.vue'

function factory(render: () => VNode) {
  return mount(
    defineComponent({
      setup() {
        return render
      },
    }),
    {
      attachTo: document.body,
      global: {
        provide: {
          NSteps: {},
        },
      },
    },
  )
}

describe('Steps.vue', () => {
  it('render', () => {
    const wrapper = factory(() => (
      <NSteps>
        <NStep />
        <NStep />
        <NStep />
      </NSteps>
    ))

    expect(wrapper.findAll('.n-step').length).toBe(3)
    expect(wrapper.classes()).toContain('n-steps--is-horizontal')
    expect(wrapper.find('.n-step').classes()).toContain('n-step--is-horizontal')
  })

  it('space', () => {
    const wrapper = factory(() => (
      <NSteps space={100}>
        <NStep />
      </NSteps>
    ))

    expect(wrapper.find('.n-step').attributes('style')).toMatch('flex-basis: 100px;')
  })

  it('alignCenter', () => {
    const wrapper = factory(() => (
      <NSteps alignCenter>
        <NStep />
      </NSteps>
    ))

    expect(wrapper.find('.n-step').classes()).toContain('n-step--is-center')
  })

  it('direction', () => {
    const wrapper = factory(() => (
      <NSteps direction="vertical">
        <NStep />
      </NSteps>
    ))

    console.log('wrapper', wrapper.html())

    expect(wrapper.classes()).toContain('n-steps--is-vertical')
    expect(wrapper.find('.n-step').classes()).toContain('n-step--is-vertical')
  })

  it('simple', () => {
    const wrapper = factory(() => (
      <NSteps simple direction="vertical" space={100} alignCenter>
        <NStep />
      </NSteps>
    ))

    expect(wrapper.classes()).toContain('n-steps--is-simple')
    expect(wrapper.find('n-step--is-center').exists()).toBe(false)
    expect(wrapper.find('n-step--is-vertical').exists()).toBe(false)
  })

  it('active', async () => {
    const wrapper = factory(() => (
      <NSteps active={0}>
        <NStep />
        <NStep />
        <NStep />
      </NSteps>
    ))

    await nextTick()
    expect(wrapper.findAll('.n-step')[0]!.classes()).toContain('n-step--status-process')
    expect(wrapper.findAll('.n-step')[1]!.classes()).toContain('n-step--status-wait')
    expect(wrapper.findAll('.n-step')[2]!.classes()).toContain('n-step--status-wait')
    await wrapper.setProps({ active: 1 })
    expect(wrapper.findAll('.n-step')[0]!.classes()).toContain('n-step--status-finish')
    expect(wrapper.findAll('.n-step')[1]!.classes()).toContain('n-step--status-process')
    expect(wrapper.findAll('.n-step')[2]!.classes()).toContain('n-step--status-wait')
    await wrapper.setProps({ active: 2 })
    expect(wrapper.findAll('.n-step')[0]!.classes()).toContain('n-step--status-finish')
    expect(wrapper.findAll('.n-step')[1]!.classes()).toContain('n-step--status-finish')
    expect(wrapper.findAll('.n-step')[2]!.classes()).toContain('n-step--status-process')
    await wrapper.setProps({ active: 3 })
    expect(wrapper.findAll('.n-step')[2]!.classes()).toContain('n-step--status-finish')
  })

  it('process-status', async () => {
    const wrapper = factory(() => (
      <NSteps active={2} process-status="success">
        <NStep />
        <NStep />
        <NStep />
      </NSteps>
    ))

    await nextTick()
    expect(wrapper.findAll('.n-step')[2]!.classes()).toContain('n-step--status-success')
    await wrapper.setProps({ processStatus: 'danger' })
    expect(wrapper.findAll('.n-step')[2]!.classes()).toContain('n-step--status-danger')
  })

  it('finish-status', async () => {
    const wrapper = factory(() => (
      <NSteps active={2} finish-status="danger">
        <NStep />
        <NStep />
        <NStep />
      </NSteps>
    ))

    await nextTick()
    expect(wrapper.findAll('.n-step')[0]!.classes()).toContain('n-step--status-danger')
    await wrapper.setProps({ finishStatus: 'success' })
    expect(wrapper.findAll('.n-step')[0]!.classes()).toContain('n-step--status-success')
  })

  it('step attribute', () => {
    const wrapper = mount({
      setup() {
        const iconEdit = markRaw(NIconEdit)

        return () => (
          <NSteps active={0}>
            <NStep icon={iconEdit} title="title" description="description" status="wait" />
          </NSteps>
        )
      },
    })

    expect(wrapper.find('.n-step').classes()).toContain('n-step--status-wait')
    expect(wrapper.find('.n-step__title').text()).toBe('title')
    expect(wrapper.find('.n-step__description').text()).toBe('description')
    expect(wrapper.findComponent(NIconEdit).exists()).toBe(true)
  })

  it('step slot', () => {
    const wrapper = factory(() => (
      <NSteps active={0}>
        <NStep
          v-slots={{
            title: () => 'A',
            description: () => 'B',
          }}
        />
      </NSteps>
    ))

    expect(wrapper.find('.n-step__title').text()).toBe('A')
    expect(wrapper.find('.n-step__description').text()).toBe('B')
  })
})
