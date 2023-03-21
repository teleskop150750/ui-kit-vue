import type { CandidateScope } from './candidates'
import { getTabindex } from './node'
import type { Arrayable, FocusableElement } from './types'

export interface TabbableItem {
  documentOrder: number
  item: FocusableElement | CandidateScope
  tabIndex: number
  isScope: boolean
  content: Arrayable<FocusableElement>
}

export function sortOrderedTabbables(a: TabbableItem, b: TabbableItem) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex
}

export function sortByOrder(candidates: Array<FocusableElement | CandidateScope>): FocusableElement[] {
  const regularTabbables: FocusableElement[] = []
  const orderedTabbables: TabbableItem[] = []

  candidates.forEach((item, i) => {
    const isScope = !!(item as CandidateScope).scopeParent
    const element: FocusableElement = resolveFocusableElement(item)
    const candidateTabindex = getTabindex(element as HTMLElement, isScope)
    const elements: Arrayable<FocusableElement> = isScope ? sortByOrder((item as CandidateScope).candidates) : element

    if (candidateTabindex === 0) {
      isScope
        ? regularTabbables.push(...(elements as FocusableElement[]))
        : regularTabbables.push(elements as FocusableElement)
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements,
      })
    }
  })

  return [
    ...orderedTabbables.sort(sortOrderedTabbables).reduce((acc: Array<FocusableElement>, sortable: TabbableItem) => {
      sortable.isScope
        ? acc.push(...(sortable.content as FocusableElement[]))
        : acc.push(sortable.content as FocusableElement)

      return acc
    }, []),
    ...regularTabbables,
  ]
}

function resolveFocusableElement(item: FocusableElement | CandidateScope): FocusableElement {
  const isScope = !!(item as CandidateScope).scopeParent

  if (isScope) {
    return (item as CandidateScope).scopeParent as FocusableElement
  }

  return item as FocusableElement
}
