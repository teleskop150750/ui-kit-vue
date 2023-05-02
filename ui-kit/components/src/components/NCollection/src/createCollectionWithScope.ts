import {
  defineComponent,
  inject,
  type InjectionKey,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  type SetupContext,
  unref,
} from 'vue'

import type { NCollectionInjectionContext, NCollectionItemInjectionContext } from './tokens'

export const COLLECTION_ITEM_SIGN = `data-n-collection-item`

// Make sure the first letter of name is capitalized
export function createCollectionWithScope(name: string) {
  const COLLECTION_NAME = `N${name}Collection`
  const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`
  const COLLECTION_INJECTION_KEY: InjectionKey<NCollectionInjectionContext> = Symbol(COLLECTION_NAME)
  const COLLECTION_ITEM_INJECTION_KEY: InjectionKey<NCollectionItemInjectionContext> = Symbol(COLLECTION_ITEM_NAME)

  // eslint-disable-next-line vue/one-component-per-file
  const NCollection = defineComponent({
    name: COLLECTION_NAME,
    inheritAttrs: false,
    setup(_: unknown, { slots }: SetupContext) {
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

      return () => slots.default && slots.default()
    },
  })

  // eslint-disable-next-line vue/one-component-per-file
  const NCollectionItem = defineComponent({
    name: COLLECTION_ITEM_NAME,
    inheritAttrs: false,
    setup(_: unknown, { attrs, slots }: SetupContext) {
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

      return () => slots.default && slots.default()
    },
  })

  return {
    COLLECTION_INJECTION_KEY,
    COLLECTION_ITEM_INJECTION_KEY,
    NCollection,
    NCollectionItem,
  }
}
