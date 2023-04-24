import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { type ComponentPublicInstance, h, nextTick } from 'vue'

import type { NCollectionInjectionContext } from '../src/tokens'
import { CollectionChildComponent, CollectionItemChildComponent, TestCollection } from '../test-helper'

const { NCollection, NCollectionItem } = TestCollection
const AXIOM = 'rem is the best girl'

describe('<NCollectionItem />', () => {
  function factory(props = {}, count = 3) {
    return mount(NCollection, {
      props,
      slots: {
        default: () =>
          h(
            CollectionChildComponent as any,
            {},
            {
              default: () =>
                Array.from({ length: count }).map((idx) =>
                  h(
                    NCollectionItem as any,
                    {},
                    {
                      default: () => [
                        h(
                          CollectionItemChildComponent,
                          {},
                          {
                            default: () => `${AXIOM} ${idx}`,
                          },
                        ),
                      ],
                    },
                  ),
                ),
            },
          ),
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

    const childItemComponent = wrapper.findComponent(CollectionChildComponent)
    const childVm = childItemComponent.vm as ComponentPublicInstance<NCollectionInjectionContext>

    const collectionItems = wrapper.findAllComponents(CollectionItemChildComponent)

    expect(childVm.itemMap.size).toBe(3)
    const items = childVm.getItems()

    expect(childVm.getItems()).toHaveLength(3)
    expect(items[0]!.ref).toBe(collectionItems.at(0)?.element)
  })
})
