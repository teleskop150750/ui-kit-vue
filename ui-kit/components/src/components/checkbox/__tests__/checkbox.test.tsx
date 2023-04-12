import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import { NFormItem } from '../../form-item'
import type { CheckboxValueType } from '../src/checkbox.model'
import Checkbox from '../src/NCheckbox.vue'
import CheckboxButton from '../src/NCheckboxButton.vue'
import CheckboxGroup from '../src/NCheckboxGroup.vue'

describe('Checkbox', () => {
  test('create', async () => {
    const checked = ref(false)
    const wrapper = mount(() => <Checkbox v-model={checked.value} label="a" />, { attachTo: document.body })

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
      const wrapper = mount(() => <Checkbox checked={checked.value} />)

      expect(wrapper.classes('n-checkbox--is-checked')).toBe(false)
    })

    test('checkbox with label attribute', async () => {
      const checked = ref(false)
      const wrapper = mount(() => <Checkbox checked={checked.value} val="a" />)

      expect(wrapper.classes('n-checkbox--is-checked')).toBe(false)
    })
  })

  describe('disabled', () => {
    test('checkbox without label', async () => {
      const checked = ref(false)
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <Checkbox v-model={checked.value} disabled />
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const checkbox = wrapper.findComponent(Checkbox)

      expect(checkbox.classes()).toContain('n-checkbox--is-disabled')
      expect(checked.value).toBe(false)
      await checkbox.trigger('click')
      await nextTick()
      expect(checkbox.classes()).toContain('n-checkbox--is-disabled')
      expect(checked.value).toBe(false)
    })

    test('checkbox with label attribute', async () => {
      const checked = ref(false)
      const wrapper = mount(() => <Checkbox v-model={checked.value} disabled val="a" />, { attachTo: document.body })

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
            <Checkbox v-model={checked.value} onChange={onChange} />
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      await wrapper.findComponent(Checkbox).trigger('click')
      expect(data.value).toBe(true)
    })

    test('checkbox with val attribute', async () => {
      const checked = ref(false)
      const data = ref()

      function onChange(val: CheckboxValueType) {
        data.value = val
      }
      const wrapper = mount(() => <Checkbox v-model={checked.value} onChange={onChange} val="Foobar" />, {
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
          <Checkbox v-model={checked.value} onChange={onChange}>
            Foobar
          </Checkbox>
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
              <Checkbox v-model={checked.value} onChange={onChange} />
            </label>
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      await wrapper.findComponent(Checkbox).trigger('click')
      expect(data.value).toBe(false)
    })
  })

  test('checkbox group', async () => {
    const checkList = ref([])
    const wrapper = mount(
      {
        setup() {
          return () => (
            <CheckboxGroup v-model={checkList.value}>
              <Checkbox val="a" ref="a" />
              <Checkbox val="b" ref="b" />
              <Checkbox val="c" ref="c" />
              <Checkbox val="d" ref="d" />
            </CheckboxGroup>
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
            <CheckboxGroup v-model={checkList.value}>
              <Checkbox val="a" ref="a" />
              <Checkbox val="b" ref="b" />
              <Checkbox val="c" ref="c" />
              <Checkbox val="d" ref="d" />
            </CheckboxGroup>
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
            <CheckboxGroup v-model={checkList.value} onChange={onChange}>
              <Checkbox val="a" ref="a" />
              <Checkbox val="b" ref="b" />
            </CheckboxGroup>
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
            <CheckboxGroup v-model={checkList.value}>
              <Checkbox val="a" ref="a" />
              <Checkbox val="b" ref="b" />
              <Checkbox val="c" ref="c" />
              <Checkbox val="d" ref="d" />
            </CheckboxGroup>
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
            <Checkbox true-value="a" false-value={3} v-model={checked.value} />
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const checkbox = wrapper.findComponent(Checkbox)

      await checkbox.trigger('click')
      await nextTick()
      expect(checked.value).toBe(3)
      await checkbox.trigger('click')
      await nextTick()
      expect(checked.value).toBe('a')
    })

    test('with val attribute', async () => {
      const checked = ref('a')
      const wrapper = mount(() => <Checkbox val="Foobar" true-value="a" false-value={3} v-model={checked.value} />, {
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
          <Checkbox true-value="a" false-value={3} v-model={checked.value}>
            Foobar
          </Checkbox>
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
          <Checkbox v-model={checked.value} checked />
          <CheckboxGroup v-model={checklist.value}>
            <Checkbox checked val="a" />
          </CheckboxGroup>
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
        <CheckboxGroup v-model={checklist.value}>
          <Checkbox val="">all</Checkbox>
          <Checkbox val="a">a</Checkbox>
          <Checkbox val="b">b</Checkbox>
        </CheckboxGroup>
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
        <CheckboxGroup v-model={checklist.value}>
          <Checkbox val={{ a: 1 }}>all</Checkbox>
          <Checkbox val={{ a: 2 }}>a</Checkbox>
          <Checkbox val={{ b: 1 }}>b</Checkbox>
        </CheckboxGroup>
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
            <CheckboxGroup v-model={checklist.value}>
              <Checkbox val={{ a: 1 }} ref="a1">
                a1
              </Checkbox>
              <Checkbox val={{ a: 2 }} ref="a2">
                a2
              </Checkbox>
              <Checkbox val={{ b: 1 }} ref="b1">
                b1
              </Checkbox>
            </CheckboxGroup>
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
    const wrapper = mount(() => <CheckboxButton v-model={checked.value} val="a" />, { attachTo: document.body })

    expect(wrapper.classes()).toContain('n-checkbox-button')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('n-checkbox-button--is-checked')
    await wrapper.trigger('click')
    expect(wrapper.classes('n-checkbox-button--is-checked')).toBe(false)
  })

  test('disabled', async () => {
    const checked = ref(false)
    const wrapper = mount(() => <CheckboxButton v-model={checked.value} disabled val="a" />)

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

    const wrapper = mount(() => <CheckboxButton v-model={checked.value} onChange={onChange} />, {
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
            <CheckboxGroup v-model={checkList.value} onChange={onChange}>
              <CheckboxButton val="a" ref="a" />
              <CheckboxButton val="b" ref="b" />
              <CheckboxButton val="c" ref="c" />
              <CheckboxButton val="d" ref="d" />
            </CheckboxGroup>
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
            <CheckboxGroup v-model={checkList.value} size="large">
              <CheckboxButton val="a" ref="a" />
              <CheckboxButton val="b" ref="b" />
              <CheckboxButton val="c" ref="c" />
              <CheckboxButton val="d" ref="d" />
            </CheckboxGroup>
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
        <CheckboxGroup v-model={checkList.value} tag="tr">
          <CheckboxButton val="a" ref="a" />
          <CheckboxButton val="b" ref="b" />
          <CheckboxButton val="c" ref="c" />
          <CheckboxButton val="d" ref="d" />
        </CheckboxGroup>
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
            <CheckboxGroup v-model={checkList.value} min={2} max={3}>
              <CheckboxButton val="a" ref="a" />
              <CheckboxButton val="b" ref="b" />
              <CheckboxButton val="c" ref="c" />
              <CheckboxButton val="d" ref="d" />
              <CheckboxButton val="e" ref="e" />
            </CheckboxGroup>
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
            <CheckboxGroup v-model={checkList.value}>
              <CheckboxButton val="a" ref="a" />
              <CheckboxButton val="b" ref="b" />
              <CheckboxButton val="c" ref="c" />
              <CheckboxButton val="d" ref="d" />
            </CheckboxGroup>
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
            <Checkbox v-model={checked.value} checked />
            <CheckboxGroup v-model={checklist.value}>
              <CheckboxButton checked val="a" />
            </CheckboxGroup>
          </div>
        ),
        { attachTo: document.body },
      )

      expect(checked.value).toBe(true)
      expect(checklist.value).toEqual(['a'])
    })

    test('checked', () => {
      const wrapper = mount(() => <Checkbox checked />)

      expect(wrapper.find('.n-checkbox').classes()).contains('n-checkbox--is-checked')
    })
  })

  describe('form item accessibility integration', () => {
    test('checkbox, no label, automatic label attachment', async () => {
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <Checkbox />
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkbox = await wrapper.findComponent(Checkbox)
      const formItemLabel = formItem.find('.n-form-item__label')
      const checkboxInput = checkbox.find('.n-checkbox__native')

      expect(checkboxInput.attributes('id')).toBe(formItemLabel.attributes('for'))
    })

    test('checkbox with val, form item is group', async () => {
      const wrapper = mount(
        () => (
          <NFormItem label="test">
            <Checkbox val="Foo">Foo</Checkbox>
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkbox = await wrapper.findComponent(Checkbox)
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
            <CheckboxGroup>
              <Checkbox val="Foo" />
              <Checkbox val="Bar" />
            </CheckboxGroup>
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkboxGroup = await wrapper.findComponent(CheckboxGroup)
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
            <CheckboxGroup label="Foo">
              <Checkbox val="Foo">Foo</Checkbox>
              <Checkbox val="Bar">Bar</Checkbox>
            </CheckboxGroup>
          </NFormItem>
        ),
        { attachTo: document.body },
      )

      const formItem = await wrapper.findComponent(NFormItem)
      const checkboxGroup = await wrapper.findComponent(CheckboxGroup)
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
                <CheckboxGroup label="Foo" ref="checkboxGroup1">
                  <Checkbox val="Foo">Foo</Checkbox>
                  <Checkbox val="Bar">Bar</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup label="Bar" ref="checkboxGroup2">
                  <Checkbox val="Foo">Foo</Checkbox>
                  <Checkbox val="Bar">Bar</Checkbox>
                </CheckboxGroup>
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
