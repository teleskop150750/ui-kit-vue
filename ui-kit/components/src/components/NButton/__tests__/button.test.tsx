import type { ComponentSize } from '@nado/ui-kit-constants'
import { NIconSearch } from '@nado/ui-kit-icons-vue'
import { mount } from '@vue/test-utils'
import { markRaw, nextTick, ref } from 'vue'

import Button from '../src/NButton.vue'
import ButtonGroup from '../src/NButtonGroup.vue'

const AXIOM = 'Rem is the best girl'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button appearance="primary" />)

    expect(wrapper.classes()).toContain('n-button--appearance-primary')
  })

  it('icon', () => {
    const wrapper = mount(() => <Button icon={markRaw(NIconSearch)} />)

    expect(wrapper.findComponent(NIconSearch).exists()).toBeTruthy()
  })

  it('type', () => {
    const wrapper = mount(() => <Button type="submit" />)

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('loading', () => {
    const wrapper = mount(() => <Button loading />)

    expect(wrapper.classes()).toContain('n-button--is-loading')
  })

  it('size', () => {
    const wrapper = mount(() => <Button size="large" />)

    expect(wrapper.classes()).toContain('n-button--size-large')
  })

  it('round', () => {
    const wrapper = mount(() => <Button round />)

    expect(wrapper.classes()).toContain('n-button--is-round')
  })

  test('render text', () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => AXIOM,
        }}
      />
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })

  test('handle click', async () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => AXIOM,
        }}
      />
    ))

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  test('handle click inside', async () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => <span class="inner-slot"></span>,
        }}
      />
    ))

    wrapper.find('.inner-slot').trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  test('loading implies disabled', async () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => AXIOM,
        }}
        loading
      />
    ))

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('disabled', async () => {
    const wrapper = mount(() => <Button disabled />)

    expect(wrapper.classes()).toContain('n-button--is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

describe('Button Group', () => {
  it('create', () => {
    const wrapper = mount({
      setup: () => () =>
        (
          <ButtonGroup>
            <Button appearance="primary">Prev</Button>
            <Button appearance="primary">Next</Button>
          </ButtonGroup>
        ),
    })

    expect(wrapper.classes()).toContain('n-button-group')
    expect(wrapper.findAll('button').length).toBe(2)
  })

  it('button group reactive size', async () => {
    const size = ref<ComponentSize>('small')
    const wrapper = mount({
      setup: () => () =>
        (
          <ButtonGroup size={size.value}>
            <Button appearance="primary">Prev</Button>
            <Button appearance="primary">Next</Button>
          </ButtonGroup>
        ),
    })

    expect(wrapper.classes()).toContain('n-button-group')
    expect(wrapper.findAll('.n-button-group button.n-button--size-small').length).toBe(2)

    size.value = 'large'
    await nextTick()

    expect(wrapper.findAll('.n-button-group button.n-button--size-large').length).toBe(2)
  })

  it('button group type', async () => {
    const wrapper = mount({
      setup: () => () =>
        (
          <ButtonGroup appearance="success">
            <Button appearance="warning">Prev</Button>
            <Button>Next</Button>
          </ButtonGroup>
        ),
    })

    expect(wrapper.classes()).toContain('n-button-group')
    expect(wrapper.findAll('.n-button-group button.n-button--appearance-success').length).toBe(1)
    expect(wrapper.findAll('.n-button-group button.n-button--appearance-warning').length).toBe(1)
  })

  it('add space in two Chinese characters', async () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => '中文',
        }}
        autoInsertSpace
      />
    ))

    expect(wrapper.find('.n-button span').text()).toBe('中文')
    expect(wrapper.find('.n-button span').classes()).toContain('n-button__content')
  })

  it('add space between two Chinese characters even if there is whitespace at both ends', async () => {
    const wrapper = mount(() => <Button autoInsertSpace>&nbsp;中文&nbsp;</Button>)

    expect(wrapper.find('.n-button span').text()).toBe('中文')

    expect(wrapper.find('.n-button span').classes()).toContain('n-button__content')
  })
})
