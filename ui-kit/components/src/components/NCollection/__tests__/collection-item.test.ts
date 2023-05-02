import { mount } from '@vue/test-utils'
import { type ComponentPublicInstance, h, nextTick } from 'vue'

import type { NCollectionInjectionContext } from '../src/tokens'
import { Collection, Item, TestCollection } from '../test-helper'

const { NCollection, NCollectionItem } = TestCollection
const AXIOM = 'rem is the best girl'

const COUNT = 3

describe('<NCollectionItem />', () => {
  function factory() {
    return mount(NCollection, {
      slots: {
        default: () =>
          h(Collection, undefined, {
            default: () =>
              Array.from({ length: COUNT }).map((idx) =>
                h(NCollectionItem, undefined, {
                  default: () => [
                    h(Item, undefined, {
                      default: () => `${AXIOM} ${idx}`,
                    }),
                  ],
                }),
              ),
          }),
      },
    })
  }

  let wrapper: ReturnType<typeof factory>

  afterEach(() => {
    wrapper.unmount()
  })

  it('should be able to render correctly', async () => {
    wrapper = factory()
    await nextTick()

    expect(wrapper.findAllComponents(NCollectionItem)).toHaveLength(3)
    expect(wrapper.findComponent(NCollectionItem).text()).toContain(AXIOM)
  })

  it('register child instance', () => {
    wrapper = factory()

    const collectionVm = wrapper.findComponent(Collection).vm as ComponentPublicInstance<NCollectionInjectionContext>
    const collectionItems = wrapper.findAllComponents(Item)

    expect(collectionVm.itemMap.size).toBe(COUNT)
    expect(collectionVm.getItems()).toHaveLength(COUNT)

    const items = collectionVm.getItems()

    expect(items[0]!.ref).toBe(collectionItems.at(0)?.element)
  })
})
