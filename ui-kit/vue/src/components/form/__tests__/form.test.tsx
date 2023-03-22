import NInput from '@ui/components/input'
import installStyle from '@ui/test-utils/style-plugin'
import { rAF } from '@ui/test-utils/tick'
import { mount } from '@vue/test-utils'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, reactive, ref } from 'vue'

// import DynamicDomainForm, { formatDomainError } from '../mocks/mock-data'
import NForm from '../src/form/form.vue'
import type { NFormRules } from '../src/form/types'
import NFormItem from '../src/form-item/form-item.vue'
import MockData from './mocks/MockData.vue'

type FormInstance = InstanceType<typeof NForm>
type FormItemInstance = InstanceType<typeof NFormItem>

const formatDomainError = (count: number) =>
  Array.from({ length: count }).reduce((prev: any, _, idx) => {
    const key = `domains.${idx}.value`

    return {
      ...prev,
      [key]: [
        {
          field: key,
          fieldValue: '',
          message: 'domain can not be null',
        },
      ],
    }
  }, {})

describe('Form', () => {
  beforeAll(() => {
    installStyle()
  })

  it('show message', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
        })

        return () => (
          <NForm model={form} ref="form">
            <NFormItem
              label="Name"
              prop="name"
              showMessage={false}
              rules={{
                required: true,
                message: 'Please input name',
                trigger: 'change',
                min: 3,
                max: 6,
              }}
            >
              <NInput v-model={form.name} />
            </NFormItem>
          </NForm>
        )
      },
    })
    const form = wrapper.findComponent(NForm).vm as FormInstance

    vi.useFakeTimers()
    const valid = await form
      .validate()
      .then(() => true)
      .catch(() => false)

    vi.runAllTimers()
    vi.useRealTimers()

    await nextTick()
    expect(valid).toBe(false)
    expect(wrapper.find('.n-form-item__message').exists()).toBe(false)
  })

  // TODO array checkbox
  it('reset field', async () => {
    vi.useFakeTimers()
    const form = reactive({
      name: '',
      address: '',
      type: new Array<string>(),
    })

    const wrapper = mount({
      setup() {
        const rules: NFormRules = {
          name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
          address: [
            {
              required: true,
              message: 'Please input address',
              trigger: 'change',
            },
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: 'Please input type',
              trigger: 'change',
            },
          ],
        }

        return () => (
          <NForm ref="form" model={form} rules={rules}>
            <NFormItem label="name" prop="name">
              <NInput v-model={form.name} ref="fieldName" />
            </NFormItem>
            <NFormItem label="address" prop="address">
              <NInput v-model={form.address} ref="fieldAddr" />
            </NFormItem>
          </NForm>
        )
      },
    })

    form.name = 'jack'
    form.address = 'aaaa'

    const formRef = wrapper.findComponent({ ref: 'form' }).vm as FormInstance

    formRef.resetFields()
    // first await waits for the validation to be dispatched.
    await nextTick()
    // after validation dispatched, it will update `validateStateDebounced` with a 100ms delay.
    // That's why we put this `vi.runAllTimers` here.
    vi.runAllTimers()
    // after timer fired, we should wait for the UI to be updated.
    await nextTick()
    expect(form.name).toBe('')
    expect(form.address).toBe('')
    expect(wrapper.findAll('.el-form-item__error')).toHaveLength(0)
    vi.useRealTimers()
  })

  it('clear validate', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          address: '',
          type: [],
        })

        const rules: NFormRules = reactive({
          name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
          address: [
            {
              required: true,
              message: 'Please input address',
              trigger: 'change',
            },
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: 'Please input type',
              trigger: 'change',
            },
          ],
        })

        return () => (
          <NForm ref="form" model={form} rules={rules}>
            <NFormItem label="name" prop="name" ref="name">
              <NInput v-model={form.name} />
            </NFormItem>
            <NFormItem label="address" prop="address" ref="address">
              <NInput v-model={form.address} />
            </NFormItem>
          </NForm>
        )
      },
    })

    const form = wrapper.findComponent({ ref: 'form' }).vm as FormInstance
    const nameField = wrapper.findComponent({ ref: 'name' }).vm as FormItemInstance
    const addressField = wrapper.findComponent({ ref: 'address' }).vm as FormItemInstance

    await form.validate().catch(() => undefined)
    await nextTick()
    expect(nameField.validateMessages).toMatchInlineSnapshot(['Please input name'])
    expect(addressField.validateMessages).toMatchInlineSnapshot(['Please input address'])
    form.clearValidate(['name'])
    await nextTick()
    expect(nameField.validateMessages).toMatchInlineSnapshot([])
    expect(addressField.validateMessages).toMatchInlineSnapshot(['Please input address'])
    form.clearValidate()
    await nextTick()
    expect(addressField.validateMessages).toMatchInlineSnapshot([])
  })

  it('scroll to field', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <NForm ref="form">
              <NFormItem prop="name" ref="formItem">
                <NInput />
              </NFormItem>
            </NForm>
          </div>
        )
      },
    })

    const oldScrollIntoView = window.HTMLElement.prototype.scrollIntoView

    const scrollIntoViewMock = vi.fn()

    // eslint-disable-next-line func-name-matching
    window.HTMLElement.prototype.scrollIntoView = function func() {
      scrollIntoViewMock(this)
    }

    const form = wrapper.findComponent({ ref: 'form' }).vm as FormInstance

    form.scrollToField('name')
    expect(scrollIntoViewMock).toHaveBeenCalledWith(wrapper.findComponent({ ref: 'formItem' }).element)

    window.HTMLElement.prototype.scrollIntoView = oldScrollIntoView
  })

  it('scroll to field', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <NForm ref="form">
              <NFormItem prop="name" ref="formItem">
                <NInput />
              </NFormItem>
            </NForm>
          </div>
        )
      },
    })

    const oldScrollIntoView = window.HTMLElement.prototype.scrollIntoView

    const scrollIntoViewMock = vi.fn()

    // eslint-disable-next-line func-name-matching
    window.HTMLElement.prototype.scrollIntoView = function fun() {
      scrollIntoViewMock(this)
    }

    const form = wrapper.findComponent({ ref: 'form' }).vm as FormInstance

    form.scrollToField('name')
    expect(scrollIntoViewMock).toHaveBeenCalledWith(wrapper.findComponent({ ref: 'formItem' }).element)

    window.HTMLElement.prototype.scrollIntoView = oldScrollIntoView
  })

  it('validate return parameters', async () => {
    const form = reactive({
      name: 'test',
      age: '',
    })

    const wrapper = mount({
      setup() {
        const rules = reactive({
          name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
          age: [{ required: true, message: 'Please input age', trigger: 'blur' }],
        })

        return () => (
          <NForm ref="formRef" model={form} rules={rules} onSubmit="return false">
            <NFormItem prop="name" label="name">
              <NInput v-model={form.name} />
            </NFormItem>
            <NFormItem prop="age" label="age">
              <NInput v-model={form.age} />
            </NFormItem>
          </NForm>
        )
      },
    })
    const { vm } = wrapper

    function validate() {
      return (vm.$refs.formRef as FormInstance)
        .validate()
        .then(() => ({ valid: true, fields: undefined }))
        .catch((error) => ({ valid: false, fields: error }))
    }

    let res = await validate()

    expect(res.valid).toBe(false)
    expect(Object.keys(res.fields).length).toBe(1)
    form.name = ''
    await nextTick()

    res = await validate()
    expect(res.valid).toBe(false)
    expect(Object.keys(res.fields).length).toBe(2)

    form.name = 'test'
    form.age = 'age'
    await nextTick()
    res = await validate()
    expect(res.valid).toBe(true)
    expect(res.fields).toBe(undefined)
  })

  it('validate status', async () => {
    const form = reactive({
      age: '20',
    })

    const wrapper = mount({
      setup() {
        const rules = ref({
          age: [{ required: true, message: 'Please input age', trigger: 'change' }],
        })

        return () => (
          <NForm ref="formRef" model={form} rules={rules.value}>
            <NFormItem ref="age" prop="age" label="age">
              <NInput v-model={form.age} />
            </NFormItem>
          </NForm>
        )
      },
    })

    await (wrapper.vm.$refs.formRef as FormInstance).validate().catch(() => undefined)
    const ageField = wrapper.findComponent({ ref: 'age' })

    expect(ageField.classes('n-form-item--is-success')).toBe(true)
    expect(ageField.classes()).toContain('n-form-item--is-success')
  })

  describe('FormItem', () => {
    const onSuccess = vi.fn()
    const onError = vi.fn()
    let wrapper: any
    const createComponent = (onSubmit?: any) => {
      wrapper = mount(() => <MockData onSuccess={onSuccess} onError={onError} onSubmit={onSubmit}></MockData>)
    }

    const findSubmitButton = () => wrapper.find('.submit')
    const findAddDomainButton = () => wrapper.find('.add-domain')
    const findDeleteDomainButton = () => wrapper.findAll('.delete-domain')
    const findDomainItems = () => wrapper.findAll('.domain-item')

    beforeEach(() => {
      createComponent()
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should register form item', async () => {
      expect(findDomainItems()).toHaveLength(1)
      await findSubmitButton().trigger('click')
      // wait for AsyncValidator to be resolved
      await rAF()
      expect(onError).toHaveBeenCalled()
    })

    it('should dynamically register form with items', async () => {
      await findAddDomainButton().trigger('click')
      expect(findDomainItems()).toHaveLength(2)

      await findSubmitButton().trigger('click')
      // wait for AsyncValidator to be resolved
      await rAF()
      expect(onError).toHaveBeenCalledWith(formatDomainError(2))
      const deleteBtns = findDeleteDomainButton()

      expect(deleteBtns).toHaveLength(2)
      await findDeleteDomainButton().at(1)!.trigger('click')
      expect(findDomainItems()).toHaveLength(1)
      await findSubmitButton().trigger('click')
      // wait for AsyncValidator to be resolved
      await rAF()
      expect(onError).toHaveBeenLastCalledWith(formatDomainError(1))
    })

    it.only('should not throw error when callback passed in', async () => {
      const onSubmit = vi.fn()

      createComponent(onSubmit)

      await findSubmitButton().trigger('click')
      await rAF()
      expect(onError).not.toHaveBeenCalled()
      expect(onSubmit).toHaveBeenCalled()
    })
  })
})
