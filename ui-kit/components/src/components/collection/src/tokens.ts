import type { Ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CollectionItem<T = Record<string, any>> = {
  ref: HTMLElement | undefined
} & T

export interface NCollectionInjectionContext {
  itemMap: Map<HTMLElement, CollectionItem>
  getItems: <T>() => CollectionItem<T>[]
  collectionRef: Ref<HTMLElement | undefined>
}

export interface NCollectionItemInjectionContext {
  collectionItemRef: Ref<HTMLElement | undefined>
}
