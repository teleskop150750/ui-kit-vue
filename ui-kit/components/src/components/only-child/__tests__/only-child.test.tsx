import { FORWARD_REF_INJECTION_KEY } from '@nado/ui-kit-hooks'
import * as Utils from '@nado/ui-kit-utils'
import { type MountingOptions, shallowMount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
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
    slots: slot ? { default: slot } : undefined,
  })

describe('NOnlyChild', () => {
  let wrapper: ReturnType<typeof createComponent>

  afterEach(() => {
    wrapper?.unmount()
  })

  it('should be able to render only one child', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    const classes = 'test_kls'

    wrapper = createComponent(() => [<div class={classes}>{AXIOM}</div>])

    await nextTick()

    expect(spy).not.toHaveBeenCalled()
    const renderedChild = wrapper.find(`.${classes}`)

    expect(renderedChild.exists()).toBe(true)
    expect(renderedChild.text()).toBe(AXIOM)
  })

  it('should be able to render string type and wrap it into span', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    wrapper = createComponent(() => [AXIOM])
    await nextTick()

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('should be able to unwrap fragmented children', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    wrapper = createComponent(() => [<>{AXIOM}</>])
    await nextTick()

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('should skip svg and child type is svg', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    const wrap = createComponent(() => [
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20">
        <path d="M14.667 14.667v-8h2.667v8h8v2.667h-8v8h-2.667v-8h-8v-2.667z" />
      </svg>,
    ])

    await nextTick()

    expect(spy).not.toHaveBeenCalled()
    expect(wrap.find('svg').attributes('viewBox')).toEqual('0 0 32 32')
    expect(wrap.find('svg').attributes('width')).toEqual('20')
    expect(wrap.find('svg').attributes('height')).toEqual('20')

    await wrap.trigger('hover')
    await expect(wrap.find('svg').exists()).toBe(true)
  })

  it('should skip comment', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    wrapper = createComponent(() => [
      <>
        {h(Comment, 'some comment')}
        {AXIOM}
      </>,
    ])
    await nextTick()

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('should return nothing and warn when no valid children found', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    wrapper = createComponent(() => [<></>])
    await nextTick()

    expect(spy).toHaveBeenCalled()
  })

  it('should render nothing when invalid node were found', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    wrapper = createComponent(() => [h(Fragment, null)])
    await nextTick()

    expect(spy).toHaveBeenCalled()
  })

  it('should warns about having multiple children', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    wrapper = createComponent(() => [AXIOM, AXIOM])
    await nextTick()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.text()).toBe('')
  })

  it('should render nothing when no children provided', async () => {
    const spy = vi.spyOn(Utils, 'debugWarn')

    wrapper = createComponent(null as any)
    await nextTick()

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.text()).toBe('')
  })
})
