import { NInput, type NInputInstance } from '@ui/components/input'
import { rAF } from '@ui/test-utils/tick'
import { mount } from '@vue/test-utils'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, type SpyInstance, vi } from 'vitest'
import { nextTick, reactive, ref } from 'vue'

import NForm from '../src/form/form.vue'
import NFormItem from '../src/form-item/form-item.vue'
import MockData from './mocks/MockData.vue'

type FormItemInstance = InstanceType<typeof NFormItem>

describe('NFormItem', () => {
  let wrapper: any = undefined
  const formItemRef = ref<FormItemInstance>()
  const inputRef = ref<NInputInstance>()
  const model = reactive({
    email: '',
  })

  const createComponent = () => {
    wrapper = mount(() => (
      <MockData model={model}>
        <NFormItem prop="email" required ref={formItemRef}>
          <NInput class="input" ref={inputRef} v-model={model.email} validateEvent={false} />
        </NFormItem>
      </MockData>
    ))
  }
  const findForm = () => wrapper.findComponent(NForm)

  beforeAll(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => vi.fn)
  })
  afterAll(() => (console.warn as any as SpyInstance).mockRestore())
  afterEach(() => {
    formItemRef.value = undefined
    inputRef.value = undefined
    model.email = ''
  })

  describe('when validation dispatches', () => {
    beforeEach(() => {
      createComponent()
    })

    afterEach(() => {
      wrapper.unmount()
    })

    describe('it successes', () => {
      it('should be able to validate successfully without callback', async () => {
        const emailInput = formItemRef.value!

        model.email = 'test'
        await nextTick()
        await rAF()

        expect(emailInput.validate('')).resolves.toBe(true)
      })

      it('should be able to validate successfully with callback', async () => {
        const emailInput = formItemRef.value!

        model.email = 'test'
        await nextTick()
        await rAF()
        const callback = vi.fn()

        expect(emailInput.validate('', callback)).resolves.toBe(true)
        await rAF()

        expect(callback).toHaveBeenCalledWith(true)
      })

      it('should emit validate event', async () => {
        const emailInput = formItemRef.value!

        model.email = 'test'
        await nextTick()
        await emailInput.validate('')
        await rAF()

        expect(findForm().emitted('validate')).toEqual([['email', true, []]])
      })
    })

    describe('it fails', () => {
      it('should be able to validate without callback', async () => {
        const emailInput = formItemRef.value!

        expect(emailInput.validate('')).rejects.toHaveProperty('email')
        expect(console.warn).toHaveBeenCalled()
      })
      it('should be able to validate with callback without throwing rejection', async () => {
        const emailInput = formItemRef.value!
        const callback = vi.fn()

        expect(emailInput.validate('', callback)).resolves.toBe(false)
        expect(console.warn).toHaveBeenCalled()
        await rAF()
        expect(callback).toHaveBeenCalled()
      })
      it('should emit validate event', async () => {
        const emailInput = formItemRef.value!
        const callback = vi.fn()

        expect(emailInput.validate('', callback)).resolves.toBe(false)
        expect(console.warn).toHaveBeenCalled()
        await rAF()
        expect(findForm().emitted('validate')).toEqual([['email', false, ['email is required']]])
      })
    })
  })
})
