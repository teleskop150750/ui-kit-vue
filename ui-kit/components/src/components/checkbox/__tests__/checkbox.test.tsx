import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import { NFormItem } from '../../form-item'
import type { CheckboxValueType } from '../src/checkbox.model'
import NCheckbox from '../src/NCheckbox.vue'
import NCheckboxButton from '../src/NCheckboxButton.vue'
import NCheckboxGroup from '../src/NCheckboxGroup.vue'

describe('Checkbox', () => {
  test('create', async () => {
    const checked = ref(false)
    const wrapper = mount(() => <NCheckbox v-model={checked.value} label="a" />, { attachTo: document.body })

    expect(wrapper.classes()).toContain('n-checkbox')
    expect(wrapper.classes()).not.toContain('n-checkbox--is-disabled')
    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('n-checkbox--is-checked')
    await wrapper.trigger('click')

    expect(wrapper.classes('n-checkbox--is-checked')).toBe(false)
  })

  describe('no v-model', () => {
    test('checkbox without label', async () => {
      const checked = ref(false)
      const wrapper = mount(() => <NCheckbox checked={checked.value} />)

      expect(wrapper.classes('n-checkbox--is-checked')).toBe(false)
    })

    test('checkbox with label attribute', async () => {
      const checked = ref(false)
      const wrapper = mount(() => <NCheckbox checked={checked.value} val="a" />)

      expect(wrapper.classes('n-checkbox--is-checked')).toBe(false)
    })
  })

  describe('disabled', () => {
    test('checkbox without label', async () => {
      const checked = ref(false)
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <NCheckbox v-model={checked.value} disabled />
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const checkbox = wrapper.findComponent(NCheckbox)

      expect(checkbox.classes()).toContain('n-checkbox--is-disabled')
      expect(checked.value).toBe(false)
      await checkbox.trigger('click')
      await nextTick()
      expect(checkbox.classes()).toContain('n-checkbox--is-disabled')
      expect(checked.value).toBe(false)
    })

    test('checkbox with label attribute', async () => {
      const checked = ref(false)
      const wrapper = mount(() => <NCheckbox v-model={checked.value} disabled val="a" />, { attachTo: document.body })

      expect(wrapper.classes()).toContain('n-checkbox--is-disabled')
      expect(checked.value).toBe(false)
      await wrapper.trigger('click')
      await nextTick()
      expect(wrapper.classes()).toContain('n-checkbox--is-disabled')
      expect(checked.value).toBe(false)
    })
  })

  describe('change event', () => {
    test('checkbox without label', async () => {
      const checked = ref(false)
      const data = ref()

      function onChange(val: CheckboxValueType) {
        data.value = val
      }

      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <NCheckbox v-model={checked.value} onChange={onChange} />
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      await wrapper.findComponent(NCheckbox).trigger('click')
      expect(data.value).toBe(true)
    })

    test('checkbox with val attribute', async () => {
      const checked = ref(false)
      const data = ref()

      function onChange(val: CheckboxValueType) {
        data.value = val
      }
      const wrapper = mount(() => <NCheckbox v-model={checked.value} onChange={onChange} val="Foobar" />, {
        attachTo: document.body,
      })

      await wrapper.trigger('click')
      expect(data.value).toBe(true)
    })

    test('checkbox with label as slot content', async () => {
      const checked = ref(false)
      const data = ref()

      function onChange(val: CheckboxValueType) {
        data.value = val
      }
      const wrapper = mount(
        () => (
          <NCheckbox v-model={checked.value} onChange={onChange}>
            Foobar
          </NCheckbox>
        ),
        { attachTo: document.body },
      )

      await wrapper.trigger('click')
      expect(data.value).toBe(true)
    })

    test('checkbox is wrapped in label', async () => {
      const checked = ref(true)
      const data = ref()

      function onChange(val: CheckboxValueType) {
        data.value = val
      }
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <label>
              <NCheckbox v-model={checked.value} onChange={onChange} />
            </label>
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      await wrapper.findComponent(NCheckbox).trigger('click')
      expect(data.value).toBe(false)
    })
  })

  test('checkbox group', async () => {
    const checkList = ref([])
    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checkList.value}>
              <NCheckbox val="a" ref="a" />
              <NCheckbox val="b" ref="b" />
              <NCheckbox val="c" ref="c" />
              <NCheckbox val="d" ref="d" />
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    expect(checkList.value.length).toBe(0)

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value.length).toBe(1)
    expect(checkList.value).toContain('a')

    await wrapper.findComponent({ ref: 'b' }).trigger('click')
    expect(checkList.value.length).toBe(2)
    expect(checkList.value).toContain('a')
    expect(checkList.value).toContain('b')
  })

  test('checkbox group without modelValue', async () => {
    const checkList = ref([])
    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checkList.value}>
              <NCheckbox val="a" ref="a" />
              <NCheckbox val="b" ref="b" />
              <NCheckbox val="c" ref="c" />
              <NCheckbox val="d" ref="d" />
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value.length).toBe(1)
    expect(checkList.value).toContain('a')
  })

  test('checkbox group change', async () => {
    const checkList = ref([])
    const data = ref<CheckboxValueType[]>([])

    function onChange(val: CheckboxValueType[]) {
      data.value = val
    }

    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checkList.value} onChange={onChange}>
              <NCheckbox val="a" ref="a" />
              <NCheckbox val="b" ref="b" />
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    await nextTick()
    expect(data.value.length).toBe(1)
    expect(data.value).toEqual(['a'])
  })

  test('nested group', async () => {
    const checkList = ref([])
    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checkList.value}>
              <NCheckbox val="a" ref="a" />
              <NCheckbox val="b" ref="b" />
              <NCheckbox val="c" ref="c" />
              <NCheckbox val="d" ref="d" />
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    expect(checkList.value.length).toBe(0)
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value).toEqual(['a'])
  })

  describe('true false val', () => {
    test('without val', async () => {
      const checked = ref('a')
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <NCheckbox true-value="a" false-value={3} v-model={checked.value} />
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const checkbox = wrapper.findComponent(NCheckbox)

      await checkbox.trigger('click')
      await nextTick()
      expect(checked.value).toBe(3)
      await checkbox.trigger('click')
      await nextTick()
      expect(checked.value).toBe('a')
    })

    test('with val attribute', async () => {
      const checked = ref('a')
      const wrapper = mount(() => <NCheckbox val="Foobar" true-value="a" false-value={3} v-model={checked.value} />, {
        attachTo: document.body,
      })

      await wrapper.trigger('click')
      await nextTick()
      expect(checked.value).toBe(3)
      await wrapper.trigger('click')
      await nextTick()
      expect(checked.value).toBe('a')
    })

    test('with label as slot content', async () => {
      const checked = ref('a')
      const wrapper = mount(
        () => (
          <NCheckbox true-value="a" false-value={3} v-model={checked.value}>
            Foobar
          </NCheckbox>
        ),
        { attachTo: document.body },
      )

      await wrapper.trigger('click')
      await nextTick()
      expect(checked.value).toBe(3)
      await wrapper.trigger('click')
      await nextTick()
      expect(checked.value).toBe('a')
    })
  })

  test('check', () => {
    const checked = ref(false)
    const checklist = ref([])

    mount(
      () => (
        <div>
          <NCheckbox v-model={checked.value} checked />
          <NCheckboxGroup v-model={checklist.value}>
            <NCheckbox checked val="a" />
          </NCheckboxGroup>
        </div>
      ),
      { attachTo: document.body },
    )

    expect(checked.value).toBe(true)
    expect(checklist.value).toEqual(['a'])
  })

  test('val', async () => {
    const checklist = ref([])
    const wrapper = mount(
      () => (
        <NCheckboxGroup v-model={checklist.value}>
          <NCheckbox val="">all</NCheckbox>
          <NCheckbox val="a">a</NCheckbox>
          <NCheckbox val="b">b</NCheckbox>
        </NCheckboxGroup>
      ),
      { attachTo: document.body },
    )

    const checkbox = wrapper.find('.n-checkbox')

    await checkbox.trigger('click')
    expect(checklist.value[0]).toEqual('')
  })

  test('val is object', async () => {
    const checklist = ref([])
    const wrapper = mount(
      () => (
        <NCheckboxGroup v-model={checklist.value}>
          <NCheckbox val={{ a: 1 }}>all</NCheckbox>
          <NCheckbox val={{ a: 2 }}>a</NCheckbox>
          <NCheckbox val={{ b: 1 }}>b</NCheckbox>
        </NCheckboxGroup>
      ),
      { attachTo: document.body },
    )

    const checkbox = wrapper.find('.n-checkbox')

    await checkbox.trigger('click')
    expect(checklist.value[0]).toEqual({ a: 1 })
    expect(checkbox.classes()).contains('n-checkbox--is-checked')
  })

  test('val is object with initial values', async () => {
    const checklist = ref([{ a: 1 }])
    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checklist.value}>
              <NCheckbox val={{ a: 1 }} ref="a1">
                a1
              </NCheckbox>
              <NCheckbox val={{ a: 2 }} ref="a2">
                a2
              </NCheckbox>
              <NCheckbox val={{ b: 1 }} ref="b1">
                b1
              </NCheckbox>
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    expect(checklist.value.length).toBe(1)
    const checkboxA1 = wrapper.findComponent({ ref: 'a1' })
    const checkboxA2 = wrapper.findComponent({ ref: 'a2' })

    await checkboxA2.trigger('click')
    expect(checklist.value).toEqual([{ a: 1 }, { a: 2 }])
    expect(checkboxA1.classes()).contains('n-checkbox--is-checked')
    expect(checkboxA2.classes()).contains('n-checkbox--is-checked')
    await checkboxA1.trigger('click')
    expect(checklist.value).toEqual([{ a: 2 }])
    expect(checkboxA1.classes()).not.contains('n-checkbox--is-checked')
  })
})

describe('check-button', () => {
  test('create', async () => {
    const checked = ref(false)
    const wrapper = mount(() => <NCheckboxButton v-model={checked.value} val="a" />, { attachTo: document.body })

    expect(wrapper.classes()).toContain('n-checkbox-button')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('n-checkbox-button--is-checked')
    await wrapper.trigger('click')
    expect(wrapper.classes('n-checkbox-button--is-checked')).toBe(false)
  })

  test('disabled', async () => {
    const checked = ref(false)
    const wrapper = mount(() => <NCheckboxButton v-model={checked.value} disabled val="a" />)

    expect(wrapper.classes()).toContain('n-checkbox-button--is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('n-checkbox-button--is-disabled')
  })

  test('change event', async () => {
    const checked = ref(false)
    const data = ref()

    function onChange(val: CheckboxValueType) {
      data.value = val
    }

    const wrapper = mount(() => <NCheckboxButton v-model={checked.value} onChange={onChange} />, {
      attachTo: document.body,
    })

    await wrapper.trigger('click')
    expect(data.value).toBe(true)
  })

  test('button group change', async () => {
    const checkList = ref([])
    const data = ref<CheckboxValueType[]>([])

    function onChange(val: CheckboxValueType[]) {
      data.value = val
    }

    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checkList.value} onChange={onChange}>
              <NCheckboxButton val="a" ref="a" />
              <NCheckboxButton val="b" ref="b" />
              <NCheckboxButton val="c" ref="c" />
              <NCheckboxButton val="d" ref="d" />
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(data.value).toEqual(['a'])
    await wrapper.findComponent({ ref: 'b' }).trigger('click')
    expect(data.value).toEqual(['a', 'b'])
  })

  test('button group props', () => {
    const checkList = ref(['a', 'b'])
    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checkList.value} size="large">
              <NCheckboxButton val="a" ref="a" />
              <NCheckboxButton val="b" ref="b" />
              <NCheckboxButton val="c" ref="c" />
              <NCheckboxButton val="d" ref="d" />
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    const checkbox = wrapper.findComponent({ ref: 'a' })

    expect(checkList.value.length).toBe(2)
    expect(checkbox.classes()).contains('n-checkbox-button--is-checked')
  })

  test('button group tag', () => {
    const checkList = ref(['a', 'b'])
    const wrapper = mount(
      () => (
        <NCheckboxGroup v-model={checkList.value} tag="tr">
          <NCheckboxButton val="a" ref="a" />
          <NCheckboxButton val="b" ref="b" />
          <NCheckboxButton val="c" ref="c" />
          <NCheckboxButton val="d" ref="d" />
        </NCheckboxGroup>
      ),
      { attachTo: document.body },
    )

    expect(wrapper.find('tr').classes('n-checkbox-group')).toBeTruthy()
  })

  test('button group min and max', async () => {
    const checkList = ref(['a', 'b'])
    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checkList.value} min={2} max={3}>
              <NCheckboxButton val="a" ref="a" />
              <NCheckboxButton val="b" ref="b" />
              <NCheckboxButton val="c" ref="c" />
              <NCheckboxButton val="d" ref="d" />
              <NCheckboxButton val="e" ref="e" />
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    expect(checkList.value.length).toBe(2)

    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value.length).toBe(2)

    await wrapper.findComponent({ ref: 'c' }).trigger('click')
    expect(checkList.value.length).toBe(3)
    expect(checkList.value).toEqual(['a', 'b', 'c'])

    expect(wrapper.findComponent({ ref: 'd' }).vm.isDisabled).toBe(true)
    expect(wrapper.findComponent({ ref: 'e' }).vm.isDisabled).toBe(true)

    checkList.value = []
    await nextTick()
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    await wrapper.findComponent({ ref: 'd' }).trigger('click')
    expect(checkList.value).toEqual(['a', 'd'])
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value).toEqual(['a', 'd'])
    expect(wrapper.findComponent({ ref: 'a' }).vm.isDisabled).toBe(true)
  })

  test('nested group', async () => {
    const checkList = ref([])
    const wrapper = mount(
      {
        setup() {
          return () => (
            <NCheckboxGroup v-model={checkList.value}>
              <NCheckboxButton val="a" ref="a" />
              <NCheckboxButton val="b" ref="b" />
              <NCheckboxButton val="c" ref="c" />
              <NCheckboxButton val="d" ref="d" />
            </NCheckboxGroup>
          )
        },
      },
      { attachTo: document.body },
    )

    expect(checkList.value.length).toBe(0)
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(checkList.value).toEqual(['a'])
  })

  describe('checked prop', () => {
    test('check', () => {
      const checked = ref(false)
      const checklist = ref([])

      mount(
        () => (
          <div>
            <NCheckbox v-model={checked.value} checked />
            <NCheckboxGroup v-model={checklist.value}>
              <NCheckboxButton checked val="a" />
            </NCheckboxGroup>
          </div>
        ),
        { attachTo: document.body },
      )

      expect(checked.value).toBe(true)
      expect(checklist.value).toEqual(['a'])
    })

    test('checked', () => {
      const wrapper = mount(() => <NCheckbox checked />)

      expect(wrapper.find('.n-checkbox').classes()).contains('n-checkbox--is-checked')
    })
  })

  describe('form item accessibility integration', () => {
    test('checkbox, no label, automatic label attachment', async () => {
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <NCheckbox />
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkbox = await wrapper.findComponent(NCheckbox)
      const formItemLabel = formItem.find('.n-form-item__label')
      const checkboxInput = checkbox.find('.n-checkbox__native')

      expect(checkboxInput.attributes('id')).toBe(formItemLabel.attributes('for'))
    })

    test('checkbox with val, form item is group', async () => {
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <NCheckbox val="Foo">Foo</NCheckbox>
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkbox = await wrapper.findComponent(NCheckbox)
      const checkboxLabel = checkbox.find('.n-checkbox__label')
      const checkboxInput = checkbox.find('.n-checkbox__native')

      expect(checkboxLabel.element.textContent).toBe('Foo')
      expect(checkboxInput.attributes('id')).toBeFalsy()
      expect(formItem.attributes('role')).toBe('group')
    })

    test('single checkbox group in form item', async () => {
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <NCheckboxGroup>
              <NCheckbox val="Foo" />
              <NCheckbox val="Bar" />
            </NCheckboxGroup>
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkboxGroup = await wrapper.findComponent(NCheckboxGroup)
      const formItemLabel = formItem.find('.n-form-item__label')

      expect(formItem.attributes('role')).toBeFalsy()
      expect(checkboxGroup.attributes('role')).toBe('group')
      expect(formItemLabel.attributes('for')).toBe(checkboxGroup.attributes('id'))
      expect(formItemLabel.attributes('id')).toBe(checkboxGroup.attributes('aria-labelledby'))
    })

    test('single checkbox group in form item, override label', async () => {
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <NCheckboxGroup label="Foo">
              <NCheckbox val="Foo">Foo</NCheckbox>
              <NCheckbox val="Bar">Bar</NCheckbox>
            </NCheckboxGroup>
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkboxGroup = await wrapper.findComponent(NCheckboxGroup)
      const formItemLabel = formItem.find('.n-form-item__label')

      expect(formItemLabel.attributes('for')).toBe(checkboxGroup.attributes('id'))
      expect(checkboxGroup.attributes('role')).toBe('group')
      expect(checkboxGroup.attributes()['aria-label']).toBe('Foo')
      expect(checkboxGroup.attributes()['aria-labelledby']).toBeFalsy()
    })

    test('multiple checkbox groups in form item', async () => {
      const wrapper = mount(
        {
          setup() {
            return () => (
              <NFormItem label="test">
                <NCheckboxGroup label="Foo" ref="checkboxGroup1">
                  <NCheckbox val="Foo">Foo</NCheckbox>
                  <NCheckbox val="Bar">Bar</NCheckbox>
                </NCheckboxGroup>
                <NCheckboxGroup label="Bar" ref="checkboxGroup2">
                  <NCheckbox val="Foo">Foo</NCheckbox>
                  <NCheckbox val="Bar">Bar</NCheckbox>
                </NCheckboxGroup>
              </NFormItem>
            )
          },
        },
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkboxGroup1 = await wrapper.findComponent({
        ref: 'checkboxGroup1',
      })
      const checkboxGroup2 = await wrapper.findComponent({
        ref: 'checkboxGroup2',
      })
      const formItemLabel = formItem.find('.n-form-item__label')

      expect(formItem.attributes('role')).toBe('group')
      expect(formItem.attributes()['aria-labelledby']).toBe(formItemLabel.attributes('id'))
      expect(checkboxGroup1.attributes('role')).toBe('group')
      expect(checkboxGroup1.attributes()['aria-label']).toBe('Foo')
      expect(checkboxGroup1.attributes()['aria-labelledby']).toBeFalsy()
      expect(checkboxGroup2.attributes('role')).toBe('group')
      expect(checkboxGroup2.attributes()['aria-label']).toBe('Bar')
      expect(checkboxGroup2.attributes()['aria-labelledby']).toBeFalsy()
    })
  })
})
