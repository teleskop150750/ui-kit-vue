import type { SetupContext } from '@vue/runtime-core'
import { inject, type InjectionKey, onBeforeUnmount, onMounted, provide, ref, unref } from 'vue'

import Collection from './NCollection.vue'
import CollectionItem from './NCollectionItem.vue'
import type { NCollectionInjectionContext, NCollectionItemInjectionContext } from './tokens'

export const COLLECTION_ITEM_SIGN = `data-n-collection-item`

// Make sure the first letter of name is capitalized
export function createCollectionWithScope(name: string) {
  const COLLECTION_NAME = `N${name}Collection`
  const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`
  const COLLECTION_INJECTION_KEY: InjectionKey<NCollectionInjectionContext> = Symbol(COLLECTION_NAME)
  const COLLECTION_ITEM_INJECTION_KEY: InjectionKey<NCollectionItemInjectionContext> = Symbol(COLLECTION_ITEM_NAME)

  const NCollection = {
    ...Collection,
    name: COLLECTION_NAME,
    setup() {
      const collectionRef = ref<HTMLElement>()
      const itemMap: NCollectionInjectionContext['itemMap'] = new Map()

      function getItems() {
        const collectionEl = unref(collectionRef)

        if (!collectionEl) {
          return []
        }

        const orderedNodes = [...collectionEl.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`)]

        const items = [...itemMap.values()]

        return items.sort((a, b) => orderedNodes.indexOf(a.ref!) - orderedNodes.indexOf(b.ref!))
      }

      provide(COLLECTION_INJECTION_KEY, {
        itemMap,
        getItems,
        collectionRef,
      })
    },
  }

  const NCollectionItem = {
    ...CollectionItem,
    name: COLLECTION_ITEM_NAME,
    setup(_: unknown, { attrs }: SetupContext) {
      const collectionItemRef = ref<HTMLElement>()
      const collectionInjection = inject(COLLECTION_INJECTION_KEY)!

      provide(COLLECTION_ITEM_INJECTION_KEY, {
        collectionItemRef,
      })

      onMounted(() => {
        const collectionItemEl = unref(collectionItemRef)

        if (collectionItemEl) {
          collectionInjection.itemMap.set(collectionItemEl, {
            ref: collectionItemEl,
            ...attrs,
          })
        }
      })

      onBeforeUnmount(() => {
        const collectionItemEl = unref(collectionItemRef)!

        collectionInjection.itemMap.delete(collectionItemEl)
      })
    },
  }

  return {
    COLLECTION_INJECTION_KEY,
    COLLECTION_ITEM_INJECTION_KEY,
    NCollection,
    NCollectionItem,
  }
}
