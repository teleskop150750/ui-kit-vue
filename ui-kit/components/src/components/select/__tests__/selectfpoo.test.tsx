// import { EVENT_CODE } from '@nado/ui-kit-constants'
// import { usePopperContainerId } from '@nado/ui-kit-hooks'
import { NIconArrowDown, NIconCaretTop, NIconCircleClose } from '@nado/ui-kit-icons-vue'
// import { hasClass } from '@nado/ui-kit-utils'
import { mount, type VueWrapper } from '@vue/test-utils'
import { markRaw, nextTick, ref } from 'vue'

// import { NFormItem } from '../../form-item'
import NOption from '../src/NOption.vue'
// import NOptionGroup from '../src/NOptionGroup.vue'
import NSelect from '../src/NSelect.vue'
import type { SelectVModel } from '../src/select.model'
import SelectGroupStub from './Select/SelectGroupStub.vue'
import SelectStub from './Select/SelectStub.vue'

vi.mock('lodash-es', async () => ({
  ...((await vi.importActual('lodash-es')) as Record<string, any>),
  debounce: vi.fn((fn) => {
    fn.cancel = vi.fn()
    fn.flush = vi.fn()

    return fn
  }),
}))

describe('Select', () => {
  let wrapper: VueWrapper<any, any>

  function findInnerInput() {
    return wrapper.find<HTMLInputElement>('.n-input__native').element
  }

  function getOptions(): HTMLElement[] {
    return [...document.querySelectorAll<HTMLElement>('body .n-select-dropdown__item')]
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('create', async () => {
    wrapper = mount(NSelect, {
      attachTo: document.body,
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    })
    expect(wrapper.classes()).toContain('n-select')
    expect(findInnerInput().placeholder).toBe('Выбрать')

    await wrapper.trigger('mouseenter')
    await wrapper.trigger('click')
    await nextTick()
    expect(wrapper.vm.visible).toBe(true)
  })

  it('options rendered correctly', () => {
    wrapper = mount(SelectStub)
    const options = wrapper.element.querySelectorAll('.n-select-dropdown__item')
    const result = Array.prototype.every.call(options, (option, index) => {
      const text = option.querySelector('span').textContent
      const { vm } = wrapper

      return text === vm.options[index].label
    })

    expect(result).toBe(true)
  })

  it('custom dropdown class', () => {
    wrapper = mount(SelectStub, {
      props: { popperClass: 'custom-dropdown' },
    })
    const dropdown = wrapper.findComponent({ name: 'NSelectDropdown' })

    expect(dropdown.classes()).toContain('custom-dropdown')
  })

  it('default value', async () => {
    const options = [
      {
        value: '选项1',
        label: '黄金糕',
      },
      {
        value: '选项2',
        label: '双皮奶',
      },
    ]

    wrapper = mount(
      <NSelect modelValue={'选项2'}>
        {options.map((item) => (
          <NOption label={item.label} key={item.value} value={item.value}></NOption>
        ))}
      </NSelect>,
    )
    await nextTick()

    expect(findInnerInput().value).toBe('双皮奶')
  })

  it('set default value to object', async () => {
    const options = [
      {
        value: {
          value: '选项1',
        },
        label: '黄金糕',
      },
      {
        value: {
          value: '选项2',
        },
        label: '双皮奶',
      },
    ]

    wrapper = mount(
      <NSelect modelValue={{ value: '选项2' }}>
        {options.map((item) => (
          <NOption label={item.label} key={item.value.value} value={item.value}></NOption>
        ))}
      </NSelect>,
    )
    await nextTick()

    expect(findInnerInput().value).toBe('双皮奶')
  })

  test('custom label', async () => {
    const options = [
      {
        id: 1,
        name: '黄金糕',
      },
      {
        id: 2,
        name: '双皮奶',
      },
    ]

    wrapper = mount(
      <NSelect modelValue={2}>
        {options.map((item) => (
          <NOption label={item.name} key={item.id} value={item.id}></NOption>
        ))}
      </NSelect>,
    )
    await nextTick()

    expect(findInnerInput().value).toBe('双皮奶')
  })

  it('custom label with object', async () => {
    const options = [
      {
        id: 1,
        name: '黄金糕',
      },
      {
        id: 2,
        name: '双皮奶',
      },
    ]

    wrapper = mount(
      <NSelect
        modelValue={{
          id: 2,
        }}
        valueKey={'id'}
      >
        {options.map((item) => (
          <NOption label={item.name} key={item.id} value={item}></NOption>
        ))}
      </NSelect>,
    )
    await nextTick()

    expect(findInnerInput().value).toBe('双皮奶')
  })

  // TODO fix options
  it('sync set value and options', async () => {
    const options = ref([
      {
        value: 'Value_1',
        label: 'Label_1',
      },
      {
        value: 'Value_2',
        label: 'Label_2',
      },
    ])

    const value = ref('Value_2')

    wrapper = mount(() => (
      <NSelect modelValue={value.value}>
        {options.value.map((item) => (
          <NOption label={item.label} key={item.value} value={item.value}></NOption>
        ))}
      </NSelect>
    ))

    options.value = [
      {
        value: 'Value_1',
        label: 'Label_1',
      },
    ]
    value.value = 'Value_1'

    await nextTick()

    expect(findInnerInput().value).toBe('Label_1')
  })

  it('single select', async () => {
    const options = ref([
      {
        value: '选项1',
        label: '黄金糕',
      },
      {
        value: '选项2',
        label: '双皮奶',
      },
      {
        value: '选项3',
        label: '蚵仔煎',
      },
      {
        value: '选项4',
        label: '龙须面',
      },
      {
        value: '选项5',
        label: '北京烤鸭',
      },
    ])
    const value = ref<SelectVModel>('')
    const count = ref(0)

    function handleChange() {
      count.value += 1
    }

    wrapper = mount(() => (
      <NSelect
        modelValue={value.value}
        onUpdate:modelValue={(e) => {
          value.value = e
        }}
        onChange={handleChange}
      >
        {options.value.map((item) => (
          <NOption label={item.label} key={item.value} value={item.value}>
            <p>
              {item.label} {item.value}
            </p>
          </NOption>
        ))}
      </NSelect>
    ))

    await wrapper.find('.select-trigger').trigger('click')
    const optionsList = getOptions()

    expect(value.value).toBe('')
    expect(findInnerInput().value).toBe('')
    optionsList[2]!.click()
    await nextTick()
    expect(value.value).toBe('选项3')
    expect(findInnerInput().value).toBe('蚵仔煎')
    expect(count.value).toBe(1)
    optionsList[4]!.click()
    await nextTick()
    expect(value.value).toBe('选项5')
    expect(findInnerInput().value).toBe('北京烤鸭')
    expect(count.value).toBe(2)
  })

  it('disabled option', async () => {
    wrapper = mount(SelectStub, {
      props: {
        options: [
          {
            value: '选项1',
            label: '黄金糕',
            disabled: false,
          },
          {
            value: '选项2',
            label: '双皮奶',
            disabled: false,
          },
          {
            value: '选项3',
            label: '蚵仔煎',
            disabled: false,
          },
          {
            value: '选项4',
            label: '龙须面',
            disabled: false,
          },
          {
            value: '选项5',
            label: '北京烤鸭',
            disabled: false,
          },
        ],
      },
    })

    wrapper.setProps({
      options: [
        {
          value: '选项1',
          label: '黄金糕',
          disabled: true,
        },
        {
          value: '选项2',
          label: '双皮奶',
          disabled: true,
        },
      ],
    })
    const { vm } = wrapper

    wrapper.find('.select-trigger').trigger('click')
    await nextTick()

    const optionsList = getOptions()

    expect(optionsList[1]!.className).toContain('n-select-dropdown__item--is-disabled')
    optionsList[1]!.click()
    await nextTick()

    expect(vm.value).toBe('')
  })

  it('disabled select', () => {
    wrapper = mount(<NSelect disabled></NSelect>)

    expect(wrapper.find('.n-input').classes()).toContain('n-input--is-disabled')
  })

  it('group disabled option', () => {
    const optionGroupData = [
      {
        label: 'Australia',
        disabled: true,
        options: [
          {
            value: 'Sydney',
            label: 'Sydney',
          },
          {
            value: 'Melbourne',
            label: 'Melbourne',
          },
        ],
      },
    ]

    wrapper = mount(SelectGroupStub, {
      props: {
        options: optionGroupData,
      },
    })
    const options = wrapper.findAllComponents(NOption)

    expect(options[0]!.classes('n-select-dropdown__item--is-disabled')).toBeTruthy()
  })

  it('keyboard operations when option-group is disabled', async () => {
    const optionGroupData = [
      {
        label: 'Australia',
        disabled: true,
        options: [
          {
            value: 'Sydney',
            label: 'Sydney',
          },
          {
            value: 'Melbourne',
            label: 'Melbourne',
          },
        ],
      },
      {
        label: 'China',
        options: [
          {
            value: 'Shanghai',
            label: 'Shanghai',
          },
          {
            value: 'Shenzhen',
            label: 'Shenzhen',
          },
          {
            value: 'Guangzhou',
            label: 'Guangzhou',
          },
          {
            value: 'Dalian',
            label: 'Dalian',
          },
        ],
      },
    ]

    wrapper = mount(SelectGroupStub, {
      props: {
        options: optionGroupData,
      },
    })
    const select = wrapper.findComponent({ name: 'NSelect' })
    const { vm } = select
    let i = 8

    while (i) {
      vm.navigateOptions('next')
      i -= 1
    }

    vm.navigateOptions('prev')
    vm.navigateOptions('prev')
    vm.navigateOptions('prev')
    await nextTick()
    vm.handleEnterSelect()
    await nextTick()
    expect(wrapper.vm.value).toBe('Dalian')
  })

  it('visible event', async () => {
    const options = ref<any>([])
    const visible = ref(false)

    function handleVisibleChange(val: boolean) {
      visible.value = val
    }
    wrapper = mount(() => (
      <NSelect modelValue={''} onVisibleChange={handleVisibleChange}>
        {options.value.map((item: any) => (
          <NOption label={item.label} key={item.value} value={item.value}></NOption>
        ))}
      </NSelect>
    ))
    const select = wrapper.findComponent({ name: 'NSelect' })
    const selectVm = select.vm

    selectVm.visible = true
    await selectVm.$nextTick()
    expect(visible.value).toBe(true)
  })

  it('keyboard operations', async () => {
    vi.useFakeTimers()
    wrapper = mount(SelectStub)
    const select = wrapper.findComponent({ name: 'NSelect' })
    const { vm } = select
    let i = 8

    while (i) {
      i -= 1
      vm.navigateOptions('next')
    }

    vm.navigateOptions('prev')
    vm.navigateOptions('prev')
    vm.navigateOptions('prev')
    await nextTick()

    expect(vm.hoverIndex).toBe(3)
    vm.handleEnterSelect()
    await nextTick()
    expect(wrapper.vm.value).toBe('选项4')
    vm.toggleMenu()

    vi.runAllTimers()
    await nextTick()

    vm.toggleMenu()
    await nextTick()

    expect(vm.hoverIndex).toBe(3)
    vi.useRealTimers()
  })

  it('clearable', async () => {
    wrapper = mount(SelectStub, {
      props: { clearable: true },
    })
    const select = wrapper.findComponent({ name: 'NSelect' })
    const { vm } = wrapper
    const selectVm = select.vm

    vm.value = '选项1'
    await nextTick()
    selectVm.isInputHover = true
    await selectVm.$nextTick()
    const iconClear = wrapper.findComponent(NIconCircleClose)

    expect(iconClear.exists()).toBe(true)
    await iconClear.trigger('click')
    expect(vm.value).toBe('')
  })

  it('suffix icon', async () => {
    wrapper = mount(NSelect)
    let suffixIcon = wrapper.findComponent(NIconArrowDown)

    expect(suffixIcon.exists()).toBe(true)
    await wrapper.setProps({ suffixIcon: markRaw(NIconCaretTop) })
    suffixIcon = wrapper.findComponent(NIconCaretTop)
    expect(suffixIcon.exists()).toBe(true)
  })

  it('test remote show suffix', async () => {
    wrapper = mount(NSelect)
    await wrapper.setProps({
      remote: true,
      filters: true,
      remoteShowSuffix: true,
    })

    const suffixIcon = wrapper.findComponent(NIconArrowDown)

    expect(suffixIcon.exists()).toBe(true)
  })

  it('fitInputWidth', async () => {
    wrapper = mount(SelectStub, {
      props: { fitInputWidth: true },
    })
    const selectWrapper = wrapper.findComponent({ name: 'NSelect' })
    const selectDom = selectWrapper.element
    const selectRect = {
      height: 40,
      width: 221,
      x: 44,
      y: 8,
      top: 8,
    }
    const mockSelectWidth = vi.spyOn(selectDom, 'getBoundingClientRect').mockReturnValue(selectRect as DOMRect)
    const dropdown = wrapper.findComponent({ name: 'NSelectDropdown' })

    dropdown.vm.minWidth = `${selectWrapper.element.getBoundingClientRect().width}px`
    await nextTick()
    expect((dropdown.element as HTMLElement).style.width).toBe('221px')
    mockSelectWidth.mockRestore()
  })

  it('check default first option', async () => {
    wrapper = mount(SelectStub, {
      attachTo: document.body,
      props: {
        filterable: true,
        defaultFirstOption: true,
      },
    })
    const select = wrapper.findComponent({ name: 'NSelect' })
    const selectVm = select.vm
    const input = wrapper.find('input')

    input.element.focus()

    expect(selectVm.hoverIndex).toBe(0)
    selectVm.navigateOptions('next')
    expect(selectVm.hoverIndex).toBe(1)
    selectVm.navigateOptions('next')
    expect(selectVm.hoverIndex).toBe(2)
  })

  it('check default first option when the very first option is disabled', async () => {
    const demoOptions = [
      {
        value: 'HTML',
        label: 'HTML',
        disabled: true,
      },
      {
        value: 'CSS',
        label: 'CSS',
        disabled: false,
      },
      {
        value: 'JavaScript',
        label: 'JavaScript',
        disabled: false,
      },
    ]

    wrapper = mount(SelectStub, {
      attachTo: document.body,
      props: {
        filterable: true,
        defaultFirstOption: true,
        options: demoOptions,
      },
    })
    const select = wrapper.findComponent({ name: 'NSelect' })
    const selectVm = select.vm
    const input = wrapper.find('input')

    input.element.focus()

    expect(selectVm.hoverIndex).toBe(1) // index 0 was skipped
    selectVm.navigateOptions('next')
    expect(selectVm.hoverIndex).toBe(2)
    selectVm.navigateOptions('next')
    expect(selectVm.hoverIndex).toBe(1) // index 0 was skipped
  })

  it('allow create', async () => {
    wrapper = mount(SelectStub, {
      attachTo: document.body,
      props: {
        filterable: true,
        allowCreate: true,
      },
    })

    const select = wrapper.findComponent({ name: 'NSelect' })
    const selectVm = select.vm
    const input = wrapper.find('input')

    input.element.focus()
    selectVm.selectedLabel = 'new'
    selectVm.handleInputChangeDebounced()
    await nextTick()
    const options = [...getOptions()]
    const target = options.find((option) => option.textContent === 'new')!

    target.click()
    expect(wrapper.vm.value).toBe('new')
  })
})
