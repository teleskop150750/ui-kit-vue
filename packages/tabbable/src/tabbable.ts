import { getCandidates, getCandidatesIteratively, type IterativeOptions } from './candidates'
import { candidateSelector, focusableCandidateSelector } from './constants'
import { isNodeMatchingSelectorFocusable, isNodeMatchingSelectorTabbable, isValidShadowRootTabbable } from './match'
import { matches } from './node'
import { sortByOrder } from './sort'
import type { FocusableElement, TabbableCheckOptions, TabbableOptions } from './types'

export function tabbable(container: Element, options?: TabbableOptions & TabbableCheckOptions): FocusableElement[] {
  options ||= {}

  const candidates = options.getShadowRoot
    ? getCandidatesIteratively([container], options.includeContainer || false, {
        filter: isNodeMatchingSelectorTabbable.bind(undefined, options),
        flatten: false,
        getShadowRoot: options.getShadowRoot,
        shadowRootFilter: isValidShadowRootTabbable,
      })
    : getCandidates(
        container,
        options.includeContainer || false,
        isNodeMatchingSelectorTabbable.bind(undefined, options),
      )

  return sortByOrder(candidates) as FocusableElement[]
}
export function focusable(container: Element, options?: TabbableOptions & TabbableCheckOptions): FocusableElement[] {
  options ||= {}

  const candidates = options.getShadowRoot
    ? getCandidatesIteratively([container], options.includeContainer || false, {
        filter: isNodeMatchingSelectorFocusable.bind(undefined, options),
        flatten: true,
        getShadowRoot: options.getShadowRoot,
      })
    : getCandidates(
        container,
        options.includeContainer || false,
        isNodeMatchingSelectorFocusable.bind(undefined, options),
      )

  return candidates as FocusableElement[]
}

export function focus3able(container: Element, options?: TabbableOptions & TabbableCheckOptions): FocusableElement[] {
  options ||= {}

  const candidates = options.getShadowRoot
    ? getCandidatesIteratively([container], options.includeContainer || false, {
        filter: isNodeMatchingSelectorFocusable.bind(undefined, options),
        flatten: false,
        getShadowRoot: options.getShadowRoot as IterativeOptions['getShadowRoot'],
      })
    : getCandidates(
        container,
        options.includeContainer || false,
        isNodeMatchingSelectorFocusable.bind(undefined, options),
      )

  return candidates as FocusableElement[]
}

export function isTabbable(node: Element, options?: TabbableCheckOptions): boolean {
  options ||= {}

  if (!node) {
    throw new Error('No node provided')
  }

  if (matches.call(node, candidateSelector) === false) {
    return false
  }

  return isNodeMatchingSelectorTabbable(options, node as HTMLInputElement)
}

export function isFocusable(node: Element, options?: TabbableCheckOptions): boolean {
  options ||= {}

  if (!node) {
    throw new Error('No node provided')
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false
  }

  return isNodeMatchingSelectorFocusable(options, node as HTMLInputElement)
}
