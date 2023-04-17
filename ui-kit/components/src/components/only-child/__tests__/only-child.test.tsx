/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FORWARD_REF_INJECTION_KEY } from '@nado/ui-kit-hooks'
import { debugWarn } from '@nado/ui-kit-utils'
import { type MountingOptions, shallowMount } from '@vue/test-utils'
import { Comment, Fragment, h, nextTick, ref } from 'vue'

import { NOnlyChild } from '../src/NOnlyChild'

type Slot = NonNullable<NonNullable<MountingOptions<any>['slots']>['default']>

const AXIOM = 'rem is the best girl'

const defaultProvide = {
  [FORWARD_REF_INJECTION_KEY as any]: {
    forwardRef: ref(null),
  },
}

const createComponent = (slot: Slot) =>
  shallowMount(NOnlyChild, {
    global: {
      provide: defaultProvide,
    },
    // vue test utils adds the entry for us even though default's value is null
    // @ts-expect-error
    slots: slot ? { default: slot } : undefined,
  })

vi.mock('@nado/ui-kit-utils', async () => {
  const mod = await vi.importActual<typeof import('@nado/ui-kit-utils')>('@nado/ui-kit-utils')

  return {
    ...mod,
    debugWarn: vi.fn(),
  }
})

describe('NOnlyChild', () => {
  let wrapper: ReturnType<typeof createComponent>

  afterEach(() => {
    wrapper?.unmount()
  })

  it('should be able to render only one child', async () => {
    const classes = 'test_kls'

    wrapper = createComponent(() => [<div class={classes}>{AXIOM}</div>])

    await nextTick()

    expect(debugWarn).not.toHaveBeenCalled()
    const renderedChild = wrapper.find(`.${classes}`)

    expect(renderedChild.exists()).toBe(true)
    expect(renderedChild.text()).toBe(AXIOM)
  })

  it('should be able to render string type and wrap it into span', async () => {
    wrapper = createComponent(() => [AXIOM])
    await nextTick()

    expect(debugWarn).not.toHaveBeenCalled()
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('should be able to unwrap fragmented children', async () => {
    wrapper = createComponent(() => [<>{AXIOM}</>])
    await nextTick()

    expect(debugWarn).not.toHaveBeenCalled()
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('should skip svg and child type is svg', async () => {
    const wrap = createComponent(() => [
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20">
        <path d="M14.667 14.667v-8h2.667v8h8v2.667h-8v8h-2.667v-8h-8v-2.667z" />
      </svg>,
    ])

    await nextTick()

    expect(debugWarn).not.toHaveBeenCalled()
    expect(wrap.find('svg').attributes('viewBox')).toEqual('0 0 32 32')
    expect(wrap.find('svg').attributes('width')).toEqual('20')
    expect(wrap.find('svg').attributes('height')).toEqual('20')

    await wrap.trigger('hover')
    await expect(wrap.find('svg').exists()).toBe(true)
  })

  it('should skip comment', async () => {
    wrapper = createComponent(() => [
      <>
        {h(Comment, 'some comment')}
        {AXIOM}
      </>,
    ])
    await nextTick()

    expect(debugWarn).not.toHaveBeenCalled()
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('should return nothing and warn when no valid children found', async () => {
    wrapper = createComponent(() => [<></>])
    await nextTick()

    expect(debugWarn).toHaveBeenCalled()
  })

  it('should render nothing when invalid node were found', async () => {
    wrapper = createComponent(() => [h(Fragment, null)])
    await nextTick()

    expect(debugWarn).toHaveBeenCalled()
  })

  it('should warns about having multiple children', async () => {
    wrapper = createComponent(() => [AXIOM, AXIOM])
    await nextTick()

    expect(debugWarn).toHaveBeenCalledTimes(1)
    expect(wrapper.text()).toBe('')
  })

  it('should render nothing when no children provided', async () => {
    wrapper = createComponent(null as any)
    await nextTick()

    expect(debugWarn).not.toHaveBeenCalled()
    expect(wrapper.text()).toBe('')
  })
})
