import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { type ComponentPublicInstance, h } from 'vue'

import type { NCollectionInjectionContext } from '../src/tokens'
import { Collection, TestCollection } from '../test-helper'

const { NCollection } = TestCollection
const AXIOM = 'rem is the best girl'

describe('<NCollection />', () => {
  function factory() {
    return mount(NCollection, {
      slots: {
        default: () =>
          h(Collection, undefined, {
            default: () => AXIOM,
          }),
      },
    })
  }

  let wrapper: ReturnType<typeof factory>

  afterEach(() => {
    wrapper.unmount()
  })

  describe('render', () => {
    it('should be able to render correctly', () => {
      wrapper = factory()

      expect(wrapper.text()).toContain(AXIOM)
    })
  })

  describe('provides', () => {
    it('should be able to provide valid data', async () => {
      wrapper = factory()

      const childComponent = wrapper.findComponent(Collection)
      const vm = childComponent.vm as ComponentPublicInstance<NCollectionInjectionContext>

      expect([...vm.itemMap.values()]).toHaveLength(0)
      expect(vm.getItems()).toHaveLength(0)
      expect(vm.collectionRef).toBe(childComponent.element)
    })
  })
})
