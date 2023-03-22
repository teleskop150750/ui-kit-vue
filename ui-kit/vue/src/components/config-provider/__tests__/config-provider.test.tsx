import type { ComponentSize } from '@ui/constants'
import { useLocale } from '@ui/hooks'
import type { Language } from '@ui/locale'
import English from '@ui/locale/lang/en'
import Chinese from '@ui/locale/lang/zh-cn'
import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'

import ConfigProvider from '../src/config-provider'
import { useGlobalComponentSettings } from '../src/hooks/use-global-config'

// eslint-disable-next-line vue/one-component-per-file
const TestComp = defineComponent({
  setup() {
    const { t } = useLocale()

    return () => <div>{t('el.popconfirm.confirmButtonText')}</div>
  },
})

describe('config-provider', () => {
  describe('locale-provider', () => {
    let wrapper: VueWrapper<any>

    beforeEach(() => {
      const currentLocale = ref<Language>(English)
      const oppositeLocale = ref<Language>(Chinese)
      const toEn = () => {
        currentLocale.value = English
        oppositeLocale.value = Chinese
      }
      const toZh = () => {
        currentLocale.value = Chinese
        oppositeLocale.value = English
      }

      wrapper = mount(() => (
        <>
          <ConfigProvider locale={currentLocale.value}>
            <TestComp class="current-locale" />
            <ConfigProvider locale={oppositeLocale.value}>
              <TestComp class="opposite-locale" />
            </ConfigProvider>
          </ConfigProvider>

          <button onClick={toEn} class="to-en">
            toEn
          </button>
          <button onClick={toZh} class="to-zh">
            toZh
          </button>
        </>
      ))
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should provide locale properly', async () => {
      expect(wrapper.find('.current-locale').text()).toBe(English.el.popconfirm.confirmButtonText)
      expect(wrapper.find('.opposite-locale').text()).toBe(Chinese.el.popconfirm.confirmButtonText)
    })

    it('should reactively update the text on page', async () => {
      expect(wrapper.find('.current-locale').text()).toBe(English.el.popconfirm.confirmButtonText)
      expect(wrapper.find('.opposite-locale').text()).toBe(Chinese.el.popconfirm.confirmButtonText)

      await wrapper.find('.to-zh').trigger('click')

      expect(wrapper.find('.current-locale').text()).toBe(Chinese.el.popconfirm.confirmButtonText)
      expect(wrapper.find('.opposite-locale').text()).toBe(English.el.popconfirm.confirmButtonText)
    })
  })

  describe('global component configs', () => {
    it('should use global configured settings', async () => {
      const locale = Chinese
      const zIndex = 1000
      const block = 'button'
      const size = 'large'
      const receiverRef = ref()
      const fallback = ref('' as ComponentSize)
      // eslint-disable-next-line vue/one-component-per-file
      const ReceiverComponent = defineComponent({
        setup() {
          receiverRef.value = useGlobalComponentSettings(block, fallback)
        },
        template: '<div></div>',
      })

      mount(() => (
        <ConfigProvider zIndex={zIndex} locale={locale} size={size}>
          <ReceiverComponent />
        </ConfigProvider>
      ))

      const vm = receiverRef.value

      expect(vm.locale.locale).toBe(locale)
      expect(vm.zIndex.currentZIndex).toBeGreaterThanOrEqual(zIndex)
      expect(vm.size).toBe(size)

      fallback.value = 'small'
      await nextTick()

      expect(vm.size).toBe('small')
    })
  })
})
