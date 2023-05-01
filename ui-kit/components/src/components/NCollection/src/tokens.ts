import type { Nillable } from '@nado/ui-kit-utils'
import type { Ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CollectionItem<T = Record<string, any>> = {
  ref: Nillable<HTMLElement>
} & T

export interface NCollectionInjectionContext {
  itemMap: Map<HTMLElement, CollectionItem>
  getItems: <T>() => CollectionItem<T>[]
  collectionRef: Ref<Nillable<HTMLElement>>
}

export interface NCollectionItemInjectionContext {
  collectionItemRef: Ref<Nillable<HTMLElement>>
}
