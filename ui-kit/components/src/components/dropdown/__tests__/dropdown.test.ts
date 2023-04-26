/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EVENT_CODE } from '@nado/ui-kit-constants'
import { usePopperContainerId } from '@nado/ui-kit-hooks'
import { rAF } from '@nado/ui-kit-test-utils'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import { NButton } from '../../button'
import { NTooltip } from '../../tooltip'
import NDropdown from '../src/NDropdown.vue'
import NDropdownItem from '../src/NDropdownItem.vue'
import NDropdownMenu from '../src/NDropdownMenu.vue'

vi.mock('@nado/ui-kit-utils', async () => {
  const mod = await vi.importActual<typeof import('@nado/ui-kit-utils')>('@nado/ui-kit-utils')

  return {
    ...mod,
    debugWarn: vi.fn(),
  }
})

const MOUSE_ENTER_EVENT = 'mouseenter'
const MOUSE_LEAVE_EVENT = 'mouseleave'
const CONTEXTMENU = 'contextmenu'

function factory(template: string, data?: any, otherObj?: any) {
  return mount({
    components: {
      NButton,
      NDropdown,
      NDropdownItem,
      NDropdownMenu,
    },
    template,
    data,
    ...otherObj,
  })
}

describe('Dropdown', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('create', async () => {
    const wrapper = factory(
      `
        <NDropdown ref="b" placement="right">
          <span class="n-dropdown-link" ref="a">
            dropdown<i class="n-icon-arrow-down n-icon--right"></i>
          </span>
          <template #dropdown>
            <NDropdownMenu>
              <NDropdownItem>Apple</NDropdownItem>
              <NDropdownItem>Orange</NDropdownItem>
              <NDropdownItem>Cherry</NDropdownItem>
              <NDropdownItem disabled>Peach</NDropdownItem>
              <NDropdownItem divided>Pear</NDropdownItem>
            </NDropdownMenu>
          </template>
        </NDropdown>
      `,
      () => ({}),
    )

    await nextTick()
    const content = wrapper.findComponent(NTooltip).vm as InstanceType<typeof NTooltip>

    vi.useFakeTimers()
    const triggerElm = wrapper.find('.n-tooltip__trigger')

    expect(content.isOpen).toBe(false)
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    expect(content.isOpen).toBe(true)
    await triggerElm.trigger(MOUSE_LEAVE_EVENT)
    vi.runAllTimers()
    expect(content.isOpen).toBe(false)
    vi.useRealTimers()
  })

  // TODO Fix
  test('menu click', async () => {
    const commandHandler = vi.fn()
    const wrapper = factory(
      `
      <NDropdown ref="b" @command="commandHandler" placement="right">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem command="a">Apple</NDropdownItem>
            <NDropdownItem command="b">Orange</NDropdownItem>
            <NDropdownItem ref="c" :command="myCommandObject">Cherry</NDropdownItem>
            <NDropdownItem command="d">Peach</NDropdownItem>
            <NDropdownItem command="e">Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({
        myCommandObject: { name: 'CommandC' },
        name: '',
      }),
      {
        methods: {
          commandHandler,
        },
      },
    )

    await nextTick()
    // const content = wrapper.findComponent({ ref: 'b' }).vm as any
    const triggerElm = wrapper.find('.n-tooltip__trigger')

    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    await nextTick()
    await wrapper.findComponent({ ref: 'c' }).findComponent({
      name: 'DropdownItemImpl',
    })
    // console.log('wrapper', wrapper.html())

    // .find('.n-dropdown-menu__item')
    // .trigger('click')
    await nextTick()
    // expect(commandHandler).toHaveBeenCalled()
  })

  test('trigger', async () => {
    const wrapper = factory(
      `
      <NDropdown trigger="click" ref="b" placement="right">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem command="a">Apple</NDropdownItem>
            <NDropdownItem command="b">Orange</NDropdownItem>
            <NDropdownItem ref="c" :command="myCommandObject">Cherry</NDropdownItem>
            <NDropdownItem command="d">Peach</NDropdownItem>
            <NDropdownItem command="e">Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({
        myCommandObject: { name: 'CommandC' },
        name: '',
      }),
    )

    await nextTick()
    const content = wrapper.findComponent(NTooltip).vm as InstanceType<typeof NTooltip>
    const triggerElm = wrapper.find('.n-dropdown-link')

    expect(content.isOpen).toBe(false)
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    expect(content.isOpen).toBe(false)
    await triggerElm.trigger('click', {
      button: 0,
    })
    await rAF()
    expect(content.isOpen).toBe(true)
  })

  test('trigger contextmenu', async () => {
    const wrapper = factory(
      `
      <NDropdown trigger="contextmenu" ref="b" placement="right">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem command="a">Apple</NDropdownItem>
            <NDropdownItem command="b">Orange</NDropdownItem>
            <NDropdownItem ref="c" :command="myCommandObject">Cherry</NDropdownItem>
            <NDropdownItem command="d">Peach</NDropdownItem>
            <NDropdownItem command="e">Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({
        myCommandObject: { name: 'CommandC' },
        name: '',
      }),
    )

    await nextTick()
    const content = wrapper.findComponent(NTooltip).vm as InstanceType<typeof NTooltip>
    const triggerElm = wrapper.find('.n-dropdown-link')

    expect(content.isOpen).toBe(false)
    await triggerElm.trigger(CONTEXTMENU)
    await rAF()
    expect(content.isOpen).toBe(true)
  })

  test('handleOpen and handleClose', async () => {
    const wrapper = factory(
      `
      <NDropdown trigger="click" ref="refDropdown" placement="right">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem command="a">Apple</NDropdownItem>
            <NDropdownItem command="b">Orange</NDropdownItem>
            <NDropdownItem command="c">Cherry</NDropdownItem>
            <NDropdownItem command="d">Peach</NDropdownItem>
            <NDropdownItem command="e">Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({
        name: '',
      }),
    )

    await nextTick()
    const dropdown = wrapper.vm

    const content = wrapper.findComponent(NTooltip).vm as InstanceType<typeof NTooltip>

    expect(content.isOpen).toBe(false)
    await dropdown.$refs.refDropdown.handleOpen()
    await rAF()
    expect(content.isOpen).toBe(true)
    await dropdown.$refs.refDropdown.handleClose()
    await rAF()
    expect(content.isOpen).toBe(false)
  })

  // TODO: fix
  test('split button', async () => {
    const handleClick = vi.fn()
    const wrapper = factory(
      `
      <NDropdown  @click="handleClick" split-button ref="b" placement="right">
      <span class="n-dropdown-link" ref="a">
        dropdown<i class="n-icon-arrow-down n-icon--right"></i>
      </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem command="a">Apple</NDropdownItem>
            <NDropdownItem command="b">Orange</NDropdownItem>
            <NDropdownItem ref="c" :command="myCommandObject">Cherry</NDropdownItem>
            <NDropdownItem command="d">Peach</NDropdownItem>
            <NDropdownItem command="e">Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({
        myCommandObject: { name: 'CommandC' },
        name: '',
      }),
      {
        methods: {
          handleClick,
        },
      },
    )

    await nextTick()
    const content = wrapper.findComponent(NTooltip).vm as InstanceType<typeof NTooltip>
    const triggerElm = wrapper.find('.n-dropdown__caret-button')
    const button = wrapper.find('.n-button')

    expect(content.isOpen).toBe(false)
    await button.trigger('click')
    expect(handleClick).toHaveBeenCalled()
    vi.useFakeTimers()
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    vi.useRealTimers()
    expect(content.isOpen).toBe(true)
  })

  test('hide on click', async () => {
    const wrapper = factory(
      `
      <NDropdown ref="b" placement="right" :hide-on-click="false">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem>Apple</NDropdownItem>
            <NDropdownItem>Orange</NDropdownItem>
            <NDropdownItem ref="c">Cherry</NDropdownItem>
            <NDropdownItem disabled>Peach</NDropdownItem>
            <NDropdownItem divided>Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )

    await nextTick()
    const content = wrapper.findComponent(NTooltip).vm as InstanceType<typeof NTooltip>

    expect(content.isOpen).toBe(false)
    const triggerElm = wrapper.find('.n-tooltip__trigger')

    vi.useFakeTimers()
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    expect(content.isOpen).toBe(true)
    await wrapper
      .findComponent({ ref: 'c' })
      .findComponent({
        name: 'DropdownItemImpl',
      })
      .trigger('click')
    vi.runAllTimers()
    expect(content.isOpen).toBe(true)
    vi.useRealTimers()
  })

  test('triggerElm keydown', async () => {
    const wrapper = factory(
      `
      <NDropdown ref="b" placement="right" :hide-on-click="false">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem>Apple</NDropdownItem>
            <NDropdownItem>Orange</NDropdownItem>
            <NDropdownItem ref="c">Cherry</NDropdownItem>
            <NDropdownItem disabled>Peach</NDropdownItem>
            <NDropdownItem divided>Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )

    await nextTick()
    const content = wrapper.findComponent(NTooltip).vm as InstanceType<typeof NTooltip>
    const triggerElm = wrapper.find('.n-tooltip__trigger')

    vi.useFakeTimers()
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    await triggerElm.trigger('keydown', {
      code: EVENT_CODE.enter,
    })
    vi.runAllTimers()
    expect(content.isOpen).toBe(false)

    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    await triggerElm.trigger('keydown', {
      code: EVENT_CODE.tab,
    })
    vi.runAllTimers()
    expect(content.isOpen).toBe(true)
    vi.useRealTimers()
  })

  // TODO fix
  test('dropdown menu keydown', async () => {
    const wrapper = factory(
      `
      <NDropdown ref="b" placement="right" :hide-on-click="false">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu ref="dropdown-menu">
            <NDropdownItem ref="d">Apple</NDropdownItem>
            <NDropdownItem>Orange</NDropdownItem>
            <NDropdownItem ref="c">Cherry</NDropdownItem>
            <NDropdownItem disabled>Peach</NDropdownItem>
            <NDropdownItem divided>Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )

    await nextTick()
    const content = wrapper.findComponent({ ref: 'dropdown-menu' })
    const triggerElm = wrapper.find('.n-tooltip__trigger')

    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    await rAF()
    await content.trigger('keydown', {
      code: EVENT_CODE.down,
    })
    await rAF()
    // expect(
    //   wrapper
    //     .findComponent({ ref: 'd' })
    //     .findComponent({
    //       name: 'DropdownItemImpl',
    //     })
    //     .find('.n-dropdown-menu__item')
    //     .element.getAttribute('tabindex'),
    // ).toBe('0')
  })

  test('max height', async () => {
    const wrapper = factory(
      `
      <NDropdown ref="b" max-height="60px">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem>Apple</NDropdownItem>
            <NDropdownItem>Orange</NDropdownItem>
            <NDropdownItem>Cherry</NDropdownItem>
            <NDropdownItem disabled>Peach</NDropdownItem>
            <NDropdownItem divided>Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )

    await nextTick()
    const scrollbar = wrapper
      .findComponent({
        ref: 'b',
      })
      .findComponent({ ref: 'scrollbarRef' })

    expect(scrollbar.find('.n-scrollbar__wrap').attributes('style')).toContain('max-height: 60px;')
  })

  test('tooltip debounce', async () => {
    const wrapper = factory(
      `
      <NDropdown ref="b">
        <span class="n-dropdown-link">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem>Apple</NDropdownItem>
            <NDropdownItem>Orange</NDropdownItem>
            <NDropdownItem>Cherry</NDropdownItem>
            <NDropdownItem>Peach</NDropdownItem>
            <NDropdownItem>Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )
    const content = wrapper.findComponent(NTooltip).vm as InstanceType<typeof NTooltip>
    const triggerElm = wrapper.find('.n-tooltip__trigger')

    expect(content.isOpen).toBe(false)

    vi.useFakeTimers()
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    await triggerElm.trigger(MOUSE_LEAVE_EVENT)
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    vi.useRealTimers()
    expect(content.isOpen).toBe(true)
  })

  test('popperClass', async () => {
    const wrapper = await factory(
      `
      <NDropdown ref="b" max-height="60px" popper-class="custom-popper-class">
        <span class="n-dropdown-link" ref="a">
          dropdown<i class="n-icon-arrow-down n-icon--right"></i>
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem>Apple</NDropdownItem>
            <NDropdownItem>Orange</NDropdownItem>
            <NDropdownItem>Cherry</NDropdownItem>
            <NDropdownItem disabled>Peach</NDropdownItem>
            <NDropdownItem divided>Pear</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )

    const popperElement = wrapper.findComponent({
      name: 'NPopperContent',
    }).element

    expect(popperElement.classList.contains('custom-popper-class')).toBe(true)
  })

  test('custom attributes for dropdown items', async () => {
    const wrapper = factory(
      `
      <NDropdown>
        <span class="n-dropdown-link">
          Custom Attributes
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem data-custom-attribute="hello">Item</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )

    await nextTick()
    expect(
      wrapper
        .findComponent({
          name: 'DropdownItemImpl',
        })
        // @ts-expect-error
        .find('.n-dropdown-menu__item').element.dataset.customAttribute,
    ).toBe('hello')
  })

  test('disable normal dropdown', async () => {
    const wrapper = factory(
      `
      <NDropdown disabled>
        <span class="n-dropdown-link">
          Dropdown List
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem data-custom-attribute="hello">Item</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )

    await nextTick()

    expect(
      wrapper
        .findComponent({
          name: 'ElDropdown',
        })
        .classes(),
    ).toContain('n-dropdown--is-disabled')
  })

  test('disable dropdown with split button', async () => {
    const wrapper = factory(
      `
      <NDropdown disabled split-button>
        <span class="n-dropdown-link">
          Dropdown List
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem data-custom-attribute="hello">Item</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )

    await nextTick()

    expect(
      wrapper
        .findAllComponents({
          name: 'NButton',
        })[0]!
        .classes(),
    ).toContain('n-button--is-disabled')
    expect(
      wrapper
        .findAllComponents({
          name: 'NButton',
        })[1]!
        .classes(),
    ).toContain('n-button--is-disabled')
  })

  test('set show-timeout/hide-timeout when trigger is hover', async () => {
    const wrapper = factory(
      `
      <NDropdown trigger="hover" :show-timeout="200" :hide-timeout="300">
        <span class="n-dropdown-link">
          Dropdown List
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem>Item</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )
    const tooltipElement = wrapper.getComponent({
      name: 'NTooltip',
    })

    expect(tooltipElement.vm.showAfter).toBe(200)
    expect(tooltipElement.vm.hideAfter).toBe(300)
  })

  test('ignore show-timeout/hide-timeout when trigger is not hover', async () => {
    const wrapper = factory(
      `
      <NDropdown trigger="click" :show-timeout="200" :hide-timeout="300">
        <span class="n-dropdown-link">
          Dropdown List
        </span>
        <template #dropdown>
          <NDropdownMenu>
            <NDropdownItem>Item</NDropdownItem>
          </NDropdownMenu>
        </template>
      </NDropdown>
      `,
      () => ({}),
    )
    const tooltipElement = wrapper.getComponent({
      name: 'NTooltip',
    })

    expect(tooltipElement.vm.showAfter).toBe(0)
    expect(tooltipElement.vm.hideAfter).toBe(0)
  })

  describe('accessibility', () => {
    test('Custom span trigger has proper attributes', async () => {
      const wrapper = factory(
        `
          <NDropdown>
            <span class="n-dropdown-link" data-test-ref="trigger">
              Dropdown List
            </span>
            <template #dropdown>
              <NDropdownMenu ref="menu">
                <NDropdownItem>Item</NDropdownItem>
              </NDropdownMenu>
            </template>
          </NDropdown>
          `,
        () => ({}),
      )

      await nextTick()
      const trigger = wrapper.find('[data-test-ref="trigger"]')
      const menu = wrapper.findComponent({ ref: 'menu' })

      expect(trigger.attributes().role).toBe('button')
      expect(trigger.attributes().tabindex).toBe('0')
      expect(trigger.attributes()['aria-haspopup']).toBe('menu')
      expect(trigger.attributes().id).toBe(menu.attributes()['aria-labelledby'])
      // TODO fix
      // expect(trigger.attributes()['aria-controls']).toBe(menu.attributes().id)
    })
    test('NButton trigger has proper attributes', async () => {
      const wrapper = factory(
        `
          <NDropdown>
            <NButton ref="trigger">
              Dropdown List
            </NButton>
            <template #dropdown>
              <NDropdownMenu ref="menu">
                <NDropdownItem>Item</NDropdownItem>
              </NDropdownMenu>
            </template>
          </NDropdown>
          `,
        () => ({}),
      )

      await nextTick()
      const trigger = wrapper.findComponent({ ref: 'trigger' })
      const menu = wrapper.findComponent({ ref: 'menu' })

      expect(trigger.attributes().role).toBe('button')
      expect(trigger.attributes().tabindex).toBe('0')
      expect(trigger.attributes()['aria-haspopup']).toBe('menu')
      expect(trigger.attributes().id).toBe(menu.attributes()['aria-labelledby'])
      // TODO fix
      // expect(trigger.attributes()['aria-controls']).toBe(menu.attributes().id)
    })
    test('Split button trigger has proper attributes', async () => {
      const wrapper = factory(
        `
          <NDropdown split-button>
            <template #dropdown>
              <NDropdownMenu ref="menu">
                <NDropdownItem>Item</NDropdownItem>
              </NDropdownMenu>
            </template>
          </NDropdown>
          `,
        () => ({}),
      )

      await nextTick()
      const trigger = wrapper.find('.n-dropdown__caret-button')
      const menu = wrapper.findComponent({ ref: 'menu' })

      expect(trigger.attributes().role).toBe('button')
      expect(trigger.attributes().tabindex).toBe('0')
      expect(trigger.attributes()['aria-haspopup']).toBe('menu')
      expect(trigger.attributes().id).toBe(menu.attributes()['aria-labelledby'])
      // TODO fix
      // expect(trigger.attributes()['aria-controls']).toBe(menu.attributes().id)
    })
    test('Menu items with "menu" role', async () => {
      const wrapper = factory(
        `
          <NDropdown split-button>
            <template #dropdown>
              <NDropdownMenu ref="menu">
                <NDropdownItem ref="menu-item">Item</NDropdownItem>
              </NDropdownMenu>
            </template>
          </NDropdown>
          `,
        () => ({}),
      )
      const menu = wrapper.findComponent({ ref: 'menu' })
      const menuItem = menu.find('.n-dropdown-menu__item')

      expect(menu.attributes().role).toBe('menu')
      expect(menuItem.attributes().role).toBe('menuitem')
    })
    test('Menu items with "navigation" role', async () => {
      const wrapper = factory(
        `
          <NDropdown split-button role="navigation">
            <template #dropdown>
              <NDropdownMenu ref="menu">
                <NDropdownItem ref="menu-item">Item</NDropdownItem>
              </NDropdownMenu>
            </template>
          </NDropdown>
          `,
        () => ({}),
      )
      const menu = wrapper.findComponent({ ref: 'menu' })
      const menuItem = menu.find('.n-dropdown-menu__item')

      expect(menu.attributes().role).toBe('navigation')
      expect(menuItem.attributes().role).toBe('link')
    })
    test('Menu items with "group" role', async () => {
      const wrapper = factory(
        `
          <NDropdown split-button role="group">
            <template #dropdown>
              <NDropdownMenu ref="menu">
                <NDropdownItem ref="menu-item">Item</NDropdownItem>
              </NDropdownMenu>
            </template>
          </NDropdown>
          `,
        () => ({}),
      )
      const menu = wrapper.findComponent({ ref: 'menu' })
      const menuItem = menu.find('.n-dropdown-menu__item')

      expect(menu.attributes().role).toBe('group')
      expect(menuItem.attributes().role).toBe('button')
    })
  })

  describe('teleported API', () => {
    test('should mount on popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      factory(
        `
        <NDropdown ref="b" placement="right">
          <span class="n-dropdown-link" ref="a">
            dropdown<i class="n-icon-arrow-down n-icon--right"></i>
          </span>
          <template #dropdown>
            <NDropdownMenu>
              <NDropdownItem>Apple</NDropdownItem>
              <NDropdownItem>Orange</NDropdownItem>
              <NDropdownItem>Cherry</NDropdownItem>
              <NDropdownItem disabled>Peach</NDropdownItem>
              <NDropdownItem divided>Pear</NDropdownItem>
            </NDropdownMenu>
          </template>
        </NDropdown>`,
        () => ({}),
      )

      await nextTick()
      const { selector } = usePopperContainerId()

      expect(document.body.querySelector(selector.value)!.innerHTML).not.toBe('')
    })

    test('should not mount on the popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      factory(
        `
          <NDropdown ref="b" placement="right" :teleported="false">
            <span class="n-dropdown-link" ref="a">
              dropdown<i class="n-icon-arrow-down n-icon--right"></i>
            </span>
            <template #dropdown>
              <NDropdownMenu>
                <NDropdownItem>Apple</NDropdownItem>
                <NDropdownItem>Orange</NDropdownItem>
                <NDropdownItem>Cherry</NDropdownItem>
                <NDropdownItem disabled>Peach</NDropdownItem>
                <NDropdownItem divided>Pear</NDropdownItem>
              </NDropdownMenu>
            </template>
          </NDropdown>`,
        () => ({}),
      )

      await nextTick()
      const { selector } = usePopperContainerId()

      expect(document.body.querySelector(selector.value)!.innerHTML).toBe('')
    })
  })
})
