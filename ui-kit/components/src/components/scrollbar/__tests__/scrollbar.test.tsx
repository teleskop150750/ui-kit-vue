import { defineGetter, makeScroll } from '@nado/ui-kit-test-utils'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import NScrollbar from '../src/NScrollbar.vue'

describe('ScrollBar', () => {
  test('vertical', async () => {
    const outerHeight = 204
    const innerHeight = 500
    const wrapper = mount(() => (
      <NScrollbar style={`height: ${outerHeight}px;`}>
        <div style={`height: ${innerHeight}px;`}></div>
      </NScrollbar>
    ))

    const scrollDom = wrapper.find('.n-scrollbar__wrap').element

    const offsetHeightRestore = defineGetter(scrollDom, 'offsetHeight', outerHeight)
    const scrollHeightRestore = defineGetter(scrollDom, 'scrollHeight', innerHeight)

    await makeScroll(scrollDom, 'scrollTop', 100)

    expect(wrapper.find('.n-scrollbar__bar--axis-vertical div').attributes('style')).toContain(
      'height: 83px; transform: translateY(49.02%);',
    )
    await makeScroll(scrollDom, 'scrollTop', 300)

    expect(wrapper.find('.n-scrollbar__bar--axis-vertical div').attributes('style')).toContain(
      'height: 83px; transform: translateY(147.06%);',
    )
    offsetHeightRestore()
    scrollHeightRestore()
  })

  test('horizontal', async () => {
    const outerWidth = 204
    const innerWidth = 500
    const wrapper = mount(() => (
      <NScrollbar style={`height: 100px; width: ${outerWidth}px;`}>
        <div style={`height: 100px; width: ${innerWidth}px;`}></div>
      </NScrollbar>
    ))

    const scrollDom = wrapper.find('.n-scrollbar__wrap').element

    const offsetWidthRestore = defineGetter(scrollDom, 'offsetWidth', outerWidth)
    const scrollWidthRestore = defineGetter(scrollDom, 'scrollWidth', innerWidth)

    await makeScroll(scrollDom, 'scrollLeft', 100)

    expect(wrapper.find('.n-scrollbar__bar--axis-horizontal div').attributes('style')).toContain(
      'width: 83px; transform: translateX(49.02%);',
    )

    await makeScroll(scrollDom, 'scrollLeft', 300)
    expect(wrapper.find('.n-scrollbar__bar--axis-horizontal div').attributes('style')).toContain(
      'width: 83px; transform: translateX(147.06%);',
    )
    offsetWidthRestore()
    scrollWidthRestore()
  })

  test('both vertical and horizontal', async () => {
    const outerHeight = 204
    const innerHeight = 500
    const outerWidth = 204
    const innerWidth = 500
    const wrapper = mount(() => (
      <NScrollbar style={`height: ${outerHeight}px; width: ${outerWidth}px;`}>
        <div style={`height: ${innerHeight}px; width: ${innerWidth}px;`}></div>
      </NScrollbar>
    ))

    const scrollDom = wrapper.find('.n-scrollbar__wrap').element

    const offsetHeightRestore = defineGetter(scrollDom, 'offsetHeight', outerHeight)
    const scrollHeightRestore = defineGetter(scrollDom, 'scrollHeight', innerHeight)
    const offsetWidthRestore = defineGetter(scrollDom, 'offsetWidth', outerWidth)
    const scrollWidthRestore = defineGetter(scrollDom, 'scrollWidth', innerWidth)

    await makeScroll(scrollDom, 'scrollTop', 100)
    await makeScroll(scrollDom, 'scrollLeft', 100)

    expect(wrapper.find('.n-scrollbar__bar--axis-vertical div').attributes('style')).toContain(
      'height: 81px; transform: translateY(49.02%);',
    )
    expect(wrapper.find('.n-scrollbar__bar--axis-horizontal div').attributes('style')).toContain(
      'width: 81px; transform: translateX(49.02%);',
    )
    await makeScroll(scrollDom, 'scrollTop', 300)
    await makeScroll(scrollDom, 'scrollLeft', 300)

    expect(wrapper.find('.n-scrollbar__bar--axis-vertical div').attributes('style')).toContain(
      'height: 81px; transform: translateY(147.06%);',
    )
    expect(wrapper.find('.n-scrollbar__bar--axis-horizontal div').attributes('style')).toContain(
      'width: 81px; transform: translateX(147.06%);',
    )

    offsetHeightRestore()
    scrollHeightRestore()
    offsetWidthRestore()
    scrollWidthRestore()
  })

  test('should render height props', async () => {
    const outerHeight = 204
    const innerHeight = 500
    const wrapper = mount(() => (
      <NScrollbar height={`${outerHeight}px`}>
        <div style={`height: ${innerHeight}px;`}></div>
      </NScrollbar>
    ))

    expect(wrapper.find('.n-scrollbar__wrap').attributes('style')).toContain('height: 204px;')
  })

  test('should render max-height props', async () => {
    const outerHeight = 204
    const innerHeight = 100
    const wrapper = mount(() => (
      <NScrollbar max-height={`${outerHeight}px`}>
        <div style={`height: ${innerHeight}px;`}></div>
      </NScrollbar>
    ))

    expect(wrapper.find('.n-scrollbar__wrap').attributes('style')).toContain('max-height: 204px;')
  })

  test('should render always props', async () => {
    const outerHeight = 204
    const innerHeight = 500
    const wrapper = mount(() => (
      <NScrollbar height={`${outerHeight}px`} always>
        <div style={`height: ${innerHeight}px;`}></div>
      </NScrollbar>
    ))

    expect(wrapper.find('.n-scrollbar__bar').attributes('style')).toBeFalsy()
  })

  test('set scrollTop & scrollLeft', async () => {
    const outerHeight = 204
    const innerHeight = 500
    const outerWidth = 204
    const innerWidth = 500
    const wrapper = mount({
      setup() {
        return () => (
          <NScrollbar ref="scrollbar" style={`height: ${outerHeight}px; width: ${outerWidth}px;`} always>
            <div style={`height: ${innerHeight}px; width: ${innerWidth}px;`}></div>
          </NScrollbar>
        )
      },
    })

    const scrollbar = wrapper.findComponent({ ref: 'scrollbar' }).vm
    const scrollDom = wrapper.find('.n-scrollbar__wrap').element

    const offsetHeightRestore = defineGetter(scrollDom, 'offsetHeight', outerHeight)
    const scrollHeightRestore = defineGetter(scrollDom, 'scrollHeight', innerHeight)
    const offsetWidthRestore = defineGetter(scrollDom, 'offsetWidth', outerWidth)
    const scrollWidthRestore = defineGetter(scrollDom, 'scrollWidth', innerWidth)

    scrollbar.setScrollTop(100)
    await nextTick()
    scrollbar.setScrollLeft(100)
    await nextTick()

    expect(wrapper.find('.n-scrollbar__bar--axis-vertical div').attributes('style')).toContain(
      'height: 81px; transform: translateY(0',
    )
    expect(wrapper.find('.n-scrollbar__bar--axis-horizontal div').attributes('style')).toContain(
      'width: 81px; transform: translateX(0%);',
    )

    offsetHeightRestore()
    scrollHeightRestore()
    offsetWidthRestore()
    scrollWidthRestore()
  })

  test('should render min-size props', async () => {
    const outerHeight = 204
    const innerHeight = 10_000
    const wrapper = mount(() => (
      <NScrollbar style={`height: ${outerHeight}px;`}>
        <div style={`height: ${innerHeight}px;`}></div>
      </NScrollbar>
    ))

    const scrollDom = wrapper.find('.n-scrollbar__wrap').element

    const offsetHeightRestore = defineGetter(scrollDom, 'offsetHeight', outerHeight)
    const scrollHeightRestore = defineGetter(scrollDom, 'scrollHeight', innerHeight)

    await makeScroll(scrollDom, 'scrollTop', 0)

    expect(wrapper.find('.n-scrollbar__bar--axis-vertical div').attributes('style')).toContain(
      'height: 20px; transform: translateY(0%);',
    )
    offsetHeightRestore()
    scrollHeightRestore()
  })

  test('should render tag props', async () => {
    const wrapper = mount(() => (
      <NScrollbar tag="ul">
        {[1, 2, 3].map((item) => (
          <li>{item}</li>
        ))}
      </NScrollbar>
    ))

    expect(wrapper.find('.n-scrollbar__view').element instanceof HTMLUListElement).toBeTruthy()
  })

  test('should render wrap-style props', async () => {
    const wrapStyle = 'background: red;'
    const wrapper = mount(() => <NScrollbar wrap-style={wrapStyle} />)

    expect(wrapper.find('.n-scrollbar__wrap').attributes('style')).toContain(wrapStyle)
  })

  test('should render wrap-class props', async () => {
    const wrapClass = 'test-wrap-class'
    const wrapper = mount(() => <NScrollbar wrap-class={wrapClass} />)

    expect(wrapper.find('.n-scrollbar__wrap').classes()).toContain(wrapClass)
  })

  test('should render view-style props', async () => {
    const viewStyle = 'display: inline-block;'
    const wrapper = mount(() => <NScrollbar view-style={viewStyle} />)

    expect(wrapper.find('.n-scrollbar__view').attributes('style')).toContain(viewStyle)
  })

  test('should render view-class props', async () => {
    const viewClass = 'test-view-class'
    const wrapper = mount(() => <NScrollbar view-class={viewClass} />)

    expect(wrapper.find('.n-scrollbar__view').classes()).toContain(viewClass)
  })
})
