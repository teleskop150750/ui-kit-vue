import type { ComponentSize } from '@nado/ui-kit-constants'
import { useLocale } from '@nado/ui-kit-hooks'
import { en, type Language, zhCn } from '@nado/ui-kit-locale'
import { mount, type VueWrapper } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'

import { useGlobalComponentSettings } from '../src/hooks'
import { NConfigProvider } from '../src/NConfigProvider'

// eslint-disable-next-line vue/one-component-per-file
const TestComp = defineComponent({
  setup() {
    const { t } = useLocale()

    return () => <div>{t('nado.popconfirm.confirmButtonText')}</div>
  },
})

describe('config-provider', () => {
  describe('locale-provider', () => {
    let wrapper: VueWrapper<any>

    beforeEach(() => {
      const currentLocale = ref<Language>(en)
      const oppositeLocale = ref<Language>(zhCn)
      const toEn = () => {
        currentLocale.value = en
        oppositeLocale.value = zhCn
      }
      const toZh = () => {
        currentLocale.value = zhCn
        oppositeLocale.value = en
      }

      wrapper = mount(() => (
        <>
          <NConfigProvider locale={currentLocale.value}>
            <TestComp class="current-locale" />
            <NConfigProvider locale={oppositeLocale.value}>
              <TestComp class="opposite-locale" />
            </NConfigProvider>
          </NConfigProvider>

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
      expect(wrapper.find('.current-locale').text()).toBe(en.nado.popconfirm.confirmButtonText)
      expect(wrapper.find('.opposite-locale').text()).toBe(zhCn.nado.popconfirm.confirmButtonText)
    })

    it('should reactively update the text on page', async () => {
      expect(wrapper.find('.current-locale').text()).toBe(en.nado.popconfirm.confirmButtonText)
      expect(wrapper.find('.opposite-locale').text()).toBe(zhCn.nado.popconfirm.confirmButtonText)

      await wrapper.find('.to-zh').trigger('click')

      expect(wrapper.find('.current-locale').text()).toBe(zhCn.nado.popconfirm.confirmButtonText)
      expect(wrapper.find('.opposite-locale').text()).toBe(en.nado.popconfirm.confirmButtonText)
    })
  })

  describe('global component configs', () => {
    it('should use global configured settings', async () => {
      const locale = zhCn
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
        <NConfigProvider zIndex={zIndex} locale={locale} size={size}>
          <ReceiverComponent />
        </NConfigProvider>
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
