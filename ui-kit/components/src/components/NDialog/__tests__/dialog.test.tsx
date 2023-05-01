import { NIconDelete } from '@nado/ui-kit-icons-vue'
import { rAF, triggerCompositeClick } from '@nado/ui-kit-test-utils'
import { mount } from '@vue/test-utils'
import { markRaw, nextTick } from 'vue'

import NDialog from '../src/NDialog.vue'

const AXIOM = 'Rem is the best girl'

describe('Dialog.vue', () => {
  test('render test', async () => {
    const wrapper = mount(NDialog, {
      props: {
        modelValue: true,
      },
      slots: {
        default: AXIOM,
      },
    })

    await nextTick()
    await rAF()
    await nextTick()
    expect(wrapper.find('.n-dialog__body').text()).toEqual(AXIOM)
  })

  test('dialog should have a title and header when it has been given', async () => {
    const HEADER = 'I am header'
    const wrapper = mount(
      <NDialog
        modelValue={true}
        v-slots={{
          header: () => HEADER,
        }}
      >
        {AXIOM}
      </NDialog>,
    )

    await nextTick()
    expect(wrapper.find('.n-dialog__header').text()).toBe(HEADER)

    mount(
      <NDialog modelValue={true} title={HEADER}>
        {AXIOM}
      </NDialog>,
    )
    await nextTick()

    expect(wrapper.find('.n-dialog__header').text()).toBe(HEADER)
  })

  // TODO: fix
  test('dialog header should have slot props', async () => {
    const wrapper = mount(NDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
      },
      slots: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        header: ({ titleId, titleClass, close }) => (
          <button data-title-id={titleId} data-title-class={titleClass} onClick={close} />
        ),
      },
    })

    await nextTick()
    const headerButton = wrapper.find('button')

    expect(headerButton.attributes()['data-title-id']).toBeTruthy()
    expect(headerButton.attributes()['data-title-class']).toBe('n-dialog__title')
    expect(wrapper.emitted().close).toBeFalsy()
    headerButton.trigger('click')
    await nextTick()
    // expect(wrapper.emitted()).toHaveProperty('close')
  })

  test('dialog should have a footer when footer has been given', async () => {
    const wrapper = mount(
      <NDialog modelValue={true} v-slots={{ footer: () => AXIOM }}>
        {AXIOM}
      </NDialog>,
    )

    await nextTick()
    expect(wrapper.find('.n-dialog__footer').exists()).toBe(true)
    expect(wrapper.find('.n-dialog__footer').text()).toBe(AXIOM)
  })

  // TODO fix
  test.todo('should append dialog to body when appendToBody is true', async () => {
    const wrapper = mount(
      <NDialog modelValue={true} appendToBody={true}>
        {AXIOM}
      </NDialog>,
      {
        attachTo: document.body,
      },
    )

    await nextTick()

    expect(document.body.firstElementChild!.classList.contains('n-overlay')).toBe(true)
    wrapper.unmount()
  })

  test('should center dialog', async () => {
    const wrapper = mount(
      <NDialog modelValue={true} center={true}>
        {AXIOM}
      </NDialog>,
    )

    await nextTick()
    expect(wrapper.find('.n-dialog--center').exists()).toBe(true)
  })

  test('should show close button', async () => {
    const wrapper = mount(<NDialog modelValue={true}>{AXIOM}</NDialog>)

    await nextTick()
    expect(wrapper.find('.n-dialog__close').exists()).toBe(true)
  })

  test('should hide close button when showClose = false', async () => {
    const wrapper = mount(
      <NDialog modelValue={true} showClose={false}>
        {AXIOM}
      </NDialog>,
    )

    await nextTick()
    expect(wrapper.find('.n-dialog__header-btn').exists()).toBe(false)
  })

  test('should close dialog when click on close button', async () => {
    const wrapper = mount(<NDialog modelValue={true}>{AXIOM}</NDialog>)

    await nextTick()
    await wrapper.find('.n-dialog__header-btn').trigger('click')
    expect(wrapper.vm.visible).toBe(false)
  })

  describe('mask related', () => {
    test('should not have overlay mask when mask is false', async () => {
      const wrapper = mount(
        <NDialog modal={false} modelValue={true}>
          {AXIOM}
        </NDialog>,
      )

      await nextTick()
      expect(wrapper.find('.n-overlay').exists()).toBe(false)
    })

    test('should close the modal when clicking on mask when `closeOnClickModal` is true', async () => {
      const wrapper = mount(<NDialog modelValue={true}>{AXIOM}</NDialog>)

      await nextTick()
      expect(wrapper.find('.n-overlay').exists()).toBe(true)
      expect(wrapper.find('.n-overlay-dialog').exists()).toBe(true)

      await triggerCompositeClick(wrapper.find('.n-overlay-dialog'))
      expect(wrapper.vm.visible).toBe(false)
    })
  })

  describe('life cycles', () => {
    test('should call before close', async () => {
      const beforeClose = vi.fn()
      const wrapper = mount(
        <NDialog modelValue={true} beforeClose={beforeClose}>
          {AXIOM}
        </NDialog>,
      )

      await nextTick()
      await wrapper.find('.n-dialog__header-btn').trigger('click')
      expect(beforeClose).toHaveBeenCalled()
    })
    test('should not close dialog when user cancelled', async () => {
      const beforeClose = vi.fn().mockImplementation((hide: (cancel: boolean) => void) => hide(true))
      const wrapper = mount(
        <NDialog modelValue={true} beforeClose={beforeClose}>
          {AXIOM}
        </NDialog>,
      )

      await nextTick()
      await wrapper.find('.n-dialog__header-btn').trigger('click')
      expect(beforeClose).toHaveBeenCalled()
      expect(wrapper.vm.visible).toBe(true)
    })
    test('should open and close with delay', async () => {
      const wrapper = mount(
        <NDialog openDelay={200} closeDelay={200} modelValue={false}>
          {AXIOM}
        </NDialog>,
      )

      expect(wrapper.vm.visible).toBe(false)
      await wrapper.setProps({
        modelValue: true,
      })
    })

    // TODO fix
    test.todo('should destroy on close', async () => {
      const wrapper = mount(
        <NDialog modelValue={true} destroyOnClose={true}>
          {AXIOM}
        </NDialog>,
      )

      expect(wrapper.vm.visible).toBe(true)
      await nextTick()
      await rAF()
      await nextTick()
      await wrapper.find('.n-dialog__header-btn').trigger('click')
      await wrapper.setProps({
        // manually setting this prop because that Transition is not available in testing,
        // updating model value event was emitted via transition hooks.
        modelValue: false,
      })
      await nextTick()
      await rAF()
      await nextTick()
      expect(wrapper.find('.n-dialog__body').exists()).toBe(false)
    })

    // TODO fix
    test.todo('should emit close event', async () => {
      let visible = true
      const onClose = vi.fn()
      const onClosed = vi.fn()
      const wrapper = mount(
        <NDialog
          modelValue={true}
          onUpdate:modelValue={(val: boolean) => {
            visible = val
          }}
          onClose={onClose}
          onClosed={onClosed}
        >
          {AXIOM}
        </NDialog>,
        {
          attachTo: document.body,
        },
      )

      expect(wrapper.vm.visible).toBe(true)
      await nextTick()
      await rAF()
      await nextTick()

      await triggerCompositeClick(wrapper.find('.n-overlay-dialog'))
      await nextTick()
      await rAF()
      await nextTick()
      expect(onClose).toHaveBeenCalled()
      expect(onClosed).toHaveBeenCalled()
      expect(visible).toBe(false)
    })

    test('closeIcon', async () => {
      const wrapper = mount(
        <NDialog modelValue={true} closeIcon={markRaw(NIconDelete)}>
          {AXIOM}
        </NDialog>,
      )

      await nextTick()
      await rAF()
      const closeIcon = wrapper.find('svg')

      expect(closeIcon.exists()).toBe(true)
      const svg = mount(NIconDelete).find('svg').element

      expect(closeIcon.element.innerHTML).toBe(svg.innerHTML)
    })

    test('should render draggable prop', async () => {
      // const wrapper = mount(
      //   <NDialog modelValue={true} draggable={true}>
      //     {AXIOM}
      //   </NDialog>,
      // )

      await nextTick()
      await rAF()
      await nextTick()
      // expect(wrapper.find('.is-draggable').exists()).toBe(true)
    })
  })

  describe('accessibility', () => {
    test('title attribute should set aria-label', async () => {
      const title = 'Hello World'
      const wrapper = mount(
        <NDialog modelValue={true} title={title}>
          {AXIOM}
        </NDialog>,
      )

      await nextTick()
      const dialog = wrapper.find('[role="dialog"]')

      expect(dialog.attributes()['aria-label']).toBe(title)
      expect(dialog.attributes()['aria-labelledby']).toBeFalsy()
    })

    test('missing title attribute should point to header slot content', async () => {
      const wrapper = mount(
        <NDialog
          modelValue={true}
          v-slots={{
            header: ({ titleId, titleClass }: { titleId: string; titleClass: string }) => (
              <h5 id={titleId} class={titleClass} />
            ),
          }}
        >
          {AXIOM}
        </NDialog>,
      )

      await nextTick()
      const dialog = wrapper.find('[role="dialog"]')
      const dialogTitle = wrapper.find('.n-dialog__title')

      expect(dialog.attributes()['aria-label']).toBeFalsy()
      expect(dialog.attributes()['aria-labelledby']).toBe(dialogTitle.attributes().id)
    })

    test('aria-describedby should point to modal body', async () => {
      const wrapper = mount(<NDialog modelValue={true}>{AXIOM}</NDialog>)

      await nextTick()
      const dialog = wrapper.find('[role="dialog"]')
      const dialogBody = wrapper.find('.n-dialog__body')

      expect(dialog.attributes()['aria-describedby']).toBe(dialogBody.attributes().id)
    })
  })
})
