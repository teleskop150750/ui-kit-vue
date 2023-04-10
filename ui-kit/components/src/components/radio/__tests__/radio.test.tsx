import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { nextTick, ref } from 'vue'

import { NFormItem } from '../../form-item'
import NRadio from '../src/NRadio.vue'
import NRadioButton from '../src/NRadioButton.vue'
import NRadioGroup from '../src/NRadioGroup.vue'
import type { NRadioProps } from '../src/radio.model'

describe('Radio', () => {
  test('create', async () => {
    const radio = ref('')

    function handleClick() {
      console.log('click')
    }
    const wrapper = mount(() => <NRadio v-model={radio.value} value="a" onClick={handleClick} />, {
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain('n-radio')
    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('n-radio--is-checked')
  })

  test('disabled', async () => {
    const radio = ref('')

    const wrapper = mount(() => <NRadio v-model={radio.value} value="3" disabled />, {
      attachTo: document.body,
    })

    await wrapper.trigger('click')
    expect(radio.value).toBe('')
    expect(wrapper.classes()).toContain('n-radio--is-disabled')
  })

  test('border', () => {
    const radio = ref('')
    const wrapper = mount(() => <NRadio v-model={radio.value} value="3" border />, {
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain('n-radio--is-bordered')
  })

  test('change event', async () => {
    const radio = ref('')
    const changeData = ref<NRadioProps['modelValue']>('')

    function handleChange(val: NRadioProps['modelValue']) {
      changeData.value = val
    }
    const wrapper = mount(() => <NRadio v-model={radio.value} value="3" onChange={handleChange} />, {
      attachTo: document.body,
    })

    await wrapper.trigger('click')
    await nextTick()
    expect(changeData.value).toEqual('3')
  })

  test('change event only triggers on user input', async () => {
    const radio = ref('')
    const changeData = ref<NRadioProps['modelValue']>('')

    function handleChange(val: NRadioProps['modelValue']) {
      changeData.value = val
    }
    mount(() => <NRadio v-model={radio.value} value="3" onChange={handleChange} />, {
      attachTo: document.body,
    })
    radio.value = '3'
    await nextTick()
    expect(changeData.value).toEqual('')
    expect(radio.value).toEqual('3')
  })
})

describe('Radio group', () => {
  test('create', async () => {
    const radio = ref(3)
    const wrapper = mount(
      () => (
        <NRadioGroup v-model={radio.value}>
          <NRadio value={3} ref="radio1">
            3
          </NRadio>
          <NRadio value={6} ref="radio2">
            6
          </NRadio>
          <NRadio value={9}>9</NRadio>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )

    await nextTick()
    const [radio1, radio2] = wrapper.findAll('.n-radio')

    expect(radio1!.classes()).toContain('n-radio--is-checked')
    await radio2!.trigger('click')

    expect(radio2!.classes()).toContain('n-radio--is-checked')
    expect(radio.value).toEqual(6)
  })

  test('id auto derive', async () => {
    const radioValue1 = ref(3)
    const wrapper1 = mount(
      () => (
        <NRadioGroup v-model={radioValue1.value}>
          <NRadio value={3} ref="radio1">
            3
          </NRadio>
          <NRadio value={6} ref="radio2">
            6
          </NRadio>
          <NRadio value={9}>9</NRadio>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )

    const radioValue2 = ref(3)
    const wrapper2 = mount(
      () => (
        <NRadioGroup v-model={radioValue2.value}>
          <NRadio value={3} ref="radio1">
            3
          </NRadio>
          <NRadio value={6} ref="radio2">
            6
          </NRadio>
          <NRadio value={9}>9</NRadio>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )

    const id1 = wrapper1.find('.n-radio').find('input').attributes('name')
    const id2 = wrapper2.find('.n-radio').find('input').attributes('name')

    expect(id1).not.toEqual(id2)
  })

  test('disabled', async () => {
    const radio = ref(3)
    const wrapper = mount(
      () => (
        <NRadioGroup v-model={radio.value} disabled>
          <NRadio value={3} ref="radio1">
            3
          </NRadio>
          <NRadio value={6} ref="radio2">
            6
          </NRadio>
          <NRadio value={9}>9</NRadio>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )

    expect(wrapper.find('label.n-radio--is-disabled').exists()).toBe(true)

    const [radio1, radio2] = wrapper.findAll('.n-radio')

    expect(radio1!.classes()).toContain('n-radio--is-checked')
    await radio2!.trigger('click')
    expect(radio.value).toEqual(3)
    expect(radio1!.classes()).toContain('n-radio--is-checked')
  })
  test('change event', async () => {
    const radio = ref(3)
    const data = ref<NRadioProps['modelValue']>(0)

    function onChange(val: NRadioProps['modelValue']) {
      console.log('val', val)

      data.value = val
    }
    const wrapper = mount(
      () => (
        <NRadioGroup v-model={radio.value} onChange={onChange}>
          <NRadio value={3}>3</NRadio>
          <NRadio value={6} ref="radio2">
            6
          </NRadio>
          <NRadio value={9}>9</NRadio>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )
    const radio2 = wrapper.findAll('.n-radio').at(1)!

    await radio2?.trigger('click')
    await nextTick()
    expect(data.value).toEqual(6)
  })
  test('change event only triggers on user input', async () => {
    const radio = ref(3)
    const data = ref<NRadioProps['modelValue']>(0)

    function onChange(val: NRadioProps['modelValue']) {
      data.value = val
    }
    mount(
      () => (
        <NRadioGroup v-model={radio.value} onChange={onChange}>
          <NRadio value={3}>3</NRadio>
          <NRadio value={6} ref="radio2">
            6
          </NRadio>
          <NRadio value={9}>9</NRadio>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )

    radio.value = 6
    await nextTick()
    expect(data.value).toEqual(0)
  })
  test('disabled when children is radio button', async () => {
    const radio = ref(3)
    const wrapper = mount(
      () => (
        <NRadioGroup v-model={radio.value} disabled>
          <NRadioButton value={3} ref="radio1">
            3
          </NRadioButton>
          <NRadioButton value={6} ref="radio2">
            6
          </NRadioButton>
          <NRadioButton value={9}>9</NRadioButton>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )

    const [radio1, radio2] = wrapper.findAll('.n-radio-button')

    expect(radio1!.classes()).toContain('n-radio-button--is-active')
    expect(wrapper.findAll('.n-radio-button--is-disabled').length).toBe(3)
    await radio2!.trigger('click')
    expect(radio.value).toEqual(3)
    expect(radio1!.classes()).toContain('n-radio-button--is-active')
  })
})

describe('Radio Button', () => {
  test.skip('create', async () => {
    const radio = ref(3)
    const wrapper = mount(
      () => (
        <NRadioGroup v-model={radio.value}>
          <NRadioButton value={3} ref="radio1">
            3
          </NRadioButton>
          <NRadioButton value={6} ref="radio2">
            6
          </NRadioButton>
          <NRadioButton value={9}>9</NRadioButton>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )
    const [radio1, radio2] = wrapper.findAll('.n-radio-button')

    expect(radio1!.classes()).toContain('n-radio-button--is-active')
    await radio2!.trigger('click')
    expect(radio2!.classes()).toContain('n-radio-button--is-active')
    expect(radio.value).toEqual(6)
  })
  test('change event', async () => {
    const radio = ref(3)
    const data = ref<NRadioProps['modelValue']>(0)

    function onChange(val: NRadioProps['modelValue']) {
      data.value = val
    }

    const wrapper = mount(
      () => (
        <NRadioGroup v-model={radio.value} onChange={onChange}>
          <NRadioButton value={3} ref="radio1">
            3
          </NRadioButton>
          <NRadioButton value={6} ref="radio2">
            6
          </NRadioButton>
          <NRadioButton value={9}>9</NRadioButton>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )
    const radio2 = wrapper.findAll('.n-radio-button').at(1)

    await radio2?.trigger('click')
    expect(radio.value).toEqual(6)
  })
  test('change event only triggers on user input', async () => {
    const radio = ref(3)
    const data = ref<NRadioProps['modelValue']>(0)

    function onChange(val: NRadioProps['modelValue']) {
      data.value = val
    }
    mount(
      () => (
        <NRadioGroup v-model={radio.value} onChange={onChange}>
          <NRadioButton value={3} ref="radio1">
            3
          </NRadioButton>
          <NRadioButton value={6} ref="radio2">
            6
          </NRadioButton>
          <NRadioButton value={9}>9</NRadioButton>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )

    radio.value = 6
    await nextTick()
    expect(data.value).toEqual(0)
  })

  test('size', () => {
    const radio = ref(3)
    const wrapper = mount(
      () => (
        <NRadioGroup v-model={radio.value} size="large">
          <NRadioButton value={3} ref="radio1">
            3
          </NRadioButton>
          <NRadioButton value={6} ref="radio2">
            6
          </NRadioButton>
          <NRadioButton value={9}>9</NRadioButton>
        </NRadioGroup>
      ),
      {
        attachTo: document.body,
      },
    )

    expect(wrapper.findAll('.n-radio-button--size-large').length).toBe(3)
  })

  describe('form item accessibility integration', () => {
    test('single radio group in form item', async () => {
      const wrapper = mount(
        () => (
          <NFormItem ref="item" label="Test">
            <NRadioGroup ref="radioGroup">
              <NRadio value="Foo" />
              <NRadio value="Bar" />
            </NRadioGroup>
          </NFormItem>
        ),
        {
          attachTo: document.body,
        },
      )

      await nextTick()
      const formItem = await wrapper.findComponent(NFormItem)
      const radioGroup = await wrapper.findComponent(NRadioGroup)
      const formItemLabel = formItem.find('.n-form-item__label')

      expect(formItem.attributes().role).toBeFalsy()
      expect(radioGroup.attributes().role).toBe('radiogroup')
      expect(formItemLabel.attributes().for).toBe(radioGroup.attributes().id)
      expect(formItemLabel.attributes().id).toBe(radioGroup.attributes()['aria-labelledby'])
    })

    test('single radio group in form item, override label', async () => {
      const wrapper = mount(
        () => (
          <NFormItem ref="item" label="Test">
            <NRadioGroup label="Foo" ref="radioGroup">
              <NRadio value="Foo" />
              <NRadio value="Bar" />
            </NRadioGroup>
          </NFormItem>
        ),
        {
          attachTo: document.body,
        },
      )

      await nextTick()
      const formItem = await wrapper.findComponent(NFormItem)
      const radioGroup = await wrapper.findComponent(NRadioGroup)
      const formItemLabel = formItem.find('.n-form-item__label')

      expect(formItemLabel.attributes().for).toBe(radioGroup.attributes().id)
      expect(radioGroup.attributes().role).toBe('radiogroup')
      expect(radioGroup.attributes()['aria-label']).toBe('Foo')
      expect(radioGroup.attributes()['aria-labelledby']).toBeFalsy()
    })

    test('multiple radio groups in form item', async () => {
      const wrapper = mount(
        () => (
          <NFormItem ref="item" label="Test">
            <NRadioGroup label="Foo" ref="radioGroup1">
              <NRadio value="Foo" />
              <NRadio value="Bar" />
            </NRadioGroup>
            <NRadioGroup label="Bar" ref="radioGroup2">
              <NRadio value="Foo" />
              <NRadio value="Bar" />
            </NRadioGroup>
          </NFormItem>
        ),
        {
          attachTo: document.body,
        },
      )

      await nextTick()
      const formItem = await wrapper.findComponent(NFormItem)
      const [radioGroup1, radioGroup2] = await wrapper.findAllComponents(NRadioGroup)
      const formItemLabel = formItem.find('.n-form-item__label')

      expect(formItem.attributes().role).toBe('group')
      expect(formItem.attributes()['aria-labelledby']).toBe(formItemLabel.attributes().id)
      expect(radioGroup1!.attributes().role).toBe('radiogroup')
      expect(radioGroup1!.attributes()['aria-label']).toBe('Foo')
      expect(radioGroup1!.attributes()['aria-labelledby']).toBeFalsy()
      expect(radioGroup2!.attributes().role).toBe('radiogroup')
      expect(radioGroup2!.attributes()['aria-label']).toBe('Bar')
      expect(radioGroup2!.attributes()['aria-labelledby']).toBeFalsy()
    })
  })
})
