import { isHidden } from './dom'
import {
  getTabindex,
  isDetailsWithSummary,
  isDisabledFromFieldset,
  isHiddenInput,
  isInert,
  isNonTabbableRadio,
} from './node'
import type { TabbableCheckOptions } from './types'

export function isNodeMatchingSelectorFocusable(options: TabbableCheckOptions, node: Element) {
  if (
    (node as HTMLInputElement).disabled ||
    isInert(node) ||
    isHiddenInput(node as HTMLInputElement) ||
    isHidden(node, options) ||
    isDetailsWithSummary(node) ||
    isDisabledFromFieldset(node as HTMLFieldSetElement)
  ) {
    return false
  }

  return true
}

export function isNodeMatchingSelectorTabbable(options: TabbableCheckOptions, node: Element) {
  if (
    isNonTabbableRadio(node as HTMLInputElement) ||
    getTabindex(node as unknown as HTMLElement) < 0 ||
    !isNodeMatchingSelectorFocusable(options, node)
  ) {
    return false
  }

  return true
}

export function isValidShadowRootTabbable(shadowHostNode: Element) {
  const tabIndex = Number.parseInt(shadowHostNode.getAttribute('tabindex')!)

  if (Number.isNaN(tabIndex) || tabIndex >= 0) {
    return true
  }

  // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.
  return false
}
