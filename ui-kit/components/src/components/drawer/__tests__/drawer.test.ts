import { rAF } from '@nado/ui-kit-test-utils'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import NButton from '../../button/src/NButton.vue'
import NDrawer from '../src/NDrawer.vue'

const _mount = (template: string, data: any, otherObj: any = undefined) =>
  mount(
    {
      components: {
        NDrawer,
        NButton,
      },
      template,
      data,
      ...otherObj,
    },
    {
      attachTo: document.body,
    },
  )
const title = 'Drawer Title'
const content = 'content'

describe('Drawer', () => {
  test('create', async () => {
    const wrapper = _mount(
      `
      <NDrawer :title="title" v-model="visible"></NDrawer>
      `,
      () => ({
        title,
        visible: true,
      }),
    )

    await nextTick()
    await rAF()
    await nextTick()

    const wrapperEl = wrapper.find('.n-overlay').element as HTMLDivElement
    const headerEl = wrapper.find('.n-drawer__header').element

    await nextTick()
    expect(wrapperEl.style.display).not.toEqual('none')
    expect(headerEl.textContent).toEqual(title)
  })

  test('render correct content', async () => {
    const wrapper = _mount(
      `
      <NDrawer :title='title' v-model='visible'>
        <span>this is a sentence</span>
        <NButton @click='dialogVisible = false'>cancel</NButton>
        <NButton type='primary' @click='dialogVisible = false'>confirm</NButton>
      </NDrawer>
      `,
      () => ({
        title,
        visible: true,
      }),
    )

    await nextTick()
    await rAF()
    await nextTick()

    expect(wrapper.find('.n-drawer__body span').element.textContent).toEqual('this is a sentence')
    const footerBtns = wrapper.findAll('.n-button')

    expect(footerBtns.length).toEqual(2)
    expect(footerBtns[0]!.find('span').element.textContent).toEqual('cancel')
    expect(footerBtns[1]!.find('span').element.textContent).toEqual('confirm')
  })

  // TODO fix
  test.todo('should append to body, when append-to-body flag is true', async () => {
    const wrapper = _mount(
      `
      <NDrawer ref='d' :title='title' v-model='visible' :append-to-body='true'>
        <span> content </span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: false,
      }),
    )
    const vm = wrapper.vm as any

    vm.visible = true
    await nextTick()
    await rAF()
    await nextTick()

    expect(document.querySelector('.n-overlay')?.parentNode).toEqual(document.body)
  })

  test('should open and close drawer properly', async () => {
    const onClose = vi.fn()
    const onClosed = vi.fn()
    const onOpened = vi.fn()
    const wrapper = _mount(
      `
      <NDrawer :title='title' v-model='visible' @closed="onClosed" @close="onClose" @opened="onOpened">
        <span>${content}</span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: false,
      }),
      {
        methods: {
          onOpened,
          onClose,
          onClosed,
        },
      },
    )
    const vm = wrapper.vm as any

    await nextTick()
    await rAF()
    await nextTick()
    expect(onOpened).not.toHaveBeenCalled()

    const drawerEl = wrapper.find('.n-overlay').element as HTMLDivElement

    expect(drawerEl.style.display).toEqual('none')

    vm.visible = true
    await nextTick()
    await rAF()
    expect(drawerEl.style.display).not.toEqual('none')
    // TODO fix
    // expect(onOpened).toHaveBeenCalled()

    // vm.visible = false
    // await nextTick()
    // await rAF()
    // await nextTick()
    // expect(onClose).toHaveBeenCalled()
  })

  test('should destroy every child after drawer was closed when destroy-on-close flag is true', async () => {
    const wrapper = _mount(
      `
      <NDrawer :title='title' v-model='visible' :append-to-body='false' :destroy-on-close='true' ref='drawer'>
        <span>${content}</span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: true,
      }),
    )
    // const vm = wrapper.vm as any

    await nextTick()
    await rAF()
    await nextTick()

    expect(wrapper.find('.n-drawer__body span').element.textContent).toEqual(content)
    // TODO fix
    // vm.$refs.drawer.handleClose()
    // await nextTick()
    // await rAF()
    // await nextTick()
    // expect(wrapper.find('.n-drawer__body').exists()).toBe(false)
  })

  // TODO fix
  test.todo('should close dialog by clicking the close button', async () => {
    const wrapper = _mount(
      `
      <NDrawer :title='title' v-model='visible' :append-to-body='false' :destroy-on-close='true' ref='drawer'>
        <span>${content}</span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: true,
      }),
    )

    await nextTick()
    await rAF()
    await nextTick()
    const vm = wrapper.vm as any

    await wrapper.find('.n-drawer__close-btn').trigger('click')
    await nextTick()
    await rAF()
    await nextTick()
    expect(vm.visible).toEqual(false)
  })

  // TODO fix
  test.todo('should invoke before-close', async () => {
    const beforeClose = vi.fn()
    const wrapper = _mount(
      `
      <NDrawer
          :before-close='beforeClose'
          :title='title'
          v-model='visible'
          :append-to-body='true'
          :destroy-on-close='true'
          ref='drawer'
          >
        <span>${content}</span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: true,
        beforeClose,
      }),
    )
    const vm = wrapper.vm as any

    vm.$refs.drawer.handleClose()

    expect(beforeClose).toHaveBeenCalled()
  })

  test('should not show close button when show-close flag is false', async () => {
    const wrapper = _mount(
      `
      <NDrawer :title='title' v-model='visible' ref='drawer' :show-close='false'>
        <span>${content}</span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: true,
      }),
    )

    expect(wrapper.find('.n-drawer__close-btn').exists()).toBe(false)
  })

  test('should have custom classes when custom classes were given', async () => {
    const classes = 'some-custom-class'
    const wrapper = _mount(
      `
      <NDrawer :title='title' v-model='visible' ref='drawer' custom-class='${classes}'>
        <span>${content}</span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: true,
      }),
    )

    expect(wrapper.find(`.${classes}`).exists()).toBe(true)
  })

  test('drawer header should have slot props', async () => {
    const wrapper = _mount(
      `
      <NDrawer v-model='visible' ref='drawer'>
        <template #header="{ titleId, titleClass, close }">
          <button :data-title-id="titleId" :data-title-class="titleClass" @click="close" />
        </template>
      </NDrawer>
      `,
      () => ({
        visible: true,
      }),
    )

    await nextTick()
    const drawer = wrapper.findComponent({ ref: 'drawer' })
    const headerButton = wrapper.find('button')

    expect(headerButton.attributes()['data-title-id']).toBeTruthy()
    expect(headerButton.attributes()['data-title-class']).toBe('n-drawer__title')
    expect(drawer.emitted().close).toBeFalsy()
    headerButton.trigger('click')
    await nextTick()
    // TODO fix
    // expect(drawer.emitted()).toHaveProperty('close')
  })

  test('should not render header when withHeader attribute is false', async () => {
    const wrapper = _mount(
      `
      <NDrawer :title='title' v-model='visible' ref='drawer' :with-header='false'>
        <span>${content}</span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: true,
      }),
    )

    expect(wrapper.find('.n-drawer__header').exists()).toBe(false)
  })

  describe('directions', () => {
    const renderer = (direction: string) =>
      _mount(
        `
          <NDrawer :title='title' v-model='visible' direction='${direction}'>
            <span>${content}</span>
          </NDrawer>
          `,
        () => ({
          title,
          visible: true,
        }),
      )

    test('should render from left to right', async () => {
      expect(renderer('ltr').find('.ltr').exists()).toBe(true)
    })
    test('should render from right to left', async () => {
      expect(renderer('rtl').find('.rtl').exists()).toBe(true)
    })
    test('should render from top to bottom', async () => {
      expect(renderer('ttb').find('.ttb').exists()).toBe(true)
    })
    test('should render from bottom to top', async () => {
      expect(renderer('btt').find('.btt').exists()).toBe(true)
    })
  })
  // TODO fix
  test.todo('events', async () => {
    const open = vi.fn()
    const opened = vi.fn()
    const close = vi.fn()
    const closed = vi.fn()
    const wrapper = _mount(
      `
      <NDrawer
        :title='title'
        v-model='visible'
        ref="drawer"
        @open="open"
        @opened="opened"
        @close="close"
        @closed="closed">
        <span>${content}</span>
      </NDrawer>
      `,
      () => ({
        title,
        visible: false,
      }),
      {
        methods: {
          close,
          closed,
          open,
          opened,
        },
      },
    )
    const vm = wrapper.vm as any
    const drawer = wrapper.vm.$refs.drawer as any

    vm.visible = true
    await nextTick()
    await nextTick()
    expect(open).toHaveBeenCalled()
    drawer.afterEnter()
    expect(opened).toHaveBeenCalled()
    expect(close).not.toHaveBeenCalled()
    expect(closed).not.toHaveBeenCalled()
    vm.visible = false
    await nextTick()
    expect(close).toHaveBeenCalled()
    drawer.afterLeave()
    expect(closed).toHaveBeenCalled()
  })
  describe('size', () => {
    const renderer = (size: string, isVertical: boolean) =>
      _mount(
        `
        <NDrawer :title='title' v-model='visible' direction='${isVertical ? 'ltr' : 'ttb'}' size='${size}'>
          <span>${content}</span>
        </NDrawer>
        `,
        () => ({
          visible: true,
          title,
        }),
      )

    test('should effect height when drawer is vertical', async () => {
      const drawerEl = renderer('50%', true).find('.n-drawer').element as HTMLDivElement

      expect(drawerEl.style.width).toEqual('50%')
    })
    test('should effect width when drawer is horizontal', async () => {
      const drawerEl = renderer('50%', false).find('.n-drawer').element as HTMLDivElement

      expect(drawerEl.style.height).toEqual('50%')
    })
  })
  describe('accessibility', () => {
    //   test('title attribute should set aria-label', async () => {
    //     const wrapper = _mount(
    //       `
    //       <NDrawer
    //         :title='title'
    //         v-model='visible'
    //         ref="drawer">
    //       </NDrawer>
    //       `,
    //       () => ({
    //         title,
    //         visible: true,
    //       }),
    //     )
    //     await nextTick()
    //     const drawerDialog = wrapper.find('[role="dialog"]')
    //     expect(drawerDialog.attributes()['aria-label']).toBe(title)
    //     expect(drawerDialog.attributes()['aria-labelledby']).toBeFalsy()
    //   })
    test('missing title attribute should point to header slot content', async () => {
      const wrapper = _mount(
        `
        <NDrawer
          v-model='visible'
          ref="drawer">
          <template #header="{ titleId, titleClass }">
            <h5 :id="titleId" :class="titleClass" />
          </template>
        </NDrawer>
        `,
        () => ({
          visible: true,
        }),
      )

      await nextTick()
      const drawerDialog = wrapper.find('[role="dialog"]')
      const drawerTitle = wrapper.find('.n-drawer__title')

      expect(drawerDialog.attributes()['aria-label']).toBeFalsy()
      expect(drawerDialog.attributes()['aria-labelledby']).toBe(drawerTitle.attributes().id)
    })
    //   test('aria-describedby should point to modal body', async () => {
    //     const wrapper = _mount(
    //       `
    //       <NDrawer
    //         v-model='visible'
    //         ref="drawer">
    //         <span>${content}</span>
    //       </NDrawer>
    //       `,
    //       () => ({
    //         visible: true,
    //       }),
    //     )
    //     await nextTick()
    //     const drawerDialog = wrapper.find('[role="dialog"]')
    //     const drawerBody = wrapper.find('.n-drawer__body')
    //     expect(drawerDialog.attributes()['aria-describedby']).toBe(drawerBody.attributes().id)
    //   })
  })
})
