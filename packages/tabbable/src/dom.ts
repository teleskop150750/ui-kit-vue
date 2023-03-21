import { getRootNode, matches } from './node'
import type { TabbableCheckOptions } from './types'

export function isZeroArea(node: Element) {
  const { width, height } = node.getBoundingClientRect()

  return width === 0 && height === 0
}

export function isHidden(node: Element, { displayCheck, getShadowRoot }: TabbableCheckOptions) {
  if (getComputedStyle(node).visibility === 'hidden') {
    return true
  }

  const isDirectSummary = matches.call(node, 'details>summary:first-of-type')
  const nodeUnderDetails = isDirectSummary ? node.parentElement : node

  if (nodeUnderDetails && matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true
  }

  if (displayCheck === 'none') {
    return false
  }

  if (displayCheck === 'non-zero-area') {
    return isZeroArea(node)
  }

  // displayCheck === 'full'
  if (typeof getShadowRoot === 'function') {
    // figure out if we should consider the node to be in an undisclosed shadow and use the
    //  'non-zero-area' fallback
    const originalNode = node

    while (node) {
      const { parentElement } = node
      const rootNode = getRootNode(node)

      if (
        parentElement &&
        !parentElement.shadowRoot &&
        getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
      ) {
        // node has an undisclosed shadow which means we can only treat it as a black box, so we
        //  fall back to a non-zero-area test
        return isZeroArea(node)
      }

      if (node!.assignedSlot) {
        // iterate up slot
        node = node!.assignedSlot
        // eslint-disable-next-line unicorn/consistent-destructuring
      } else if (!parentElement && rootNode !== node.ownerDocument) {
        // cross shadow boundary
        node = (rootNode as ShadowRoot).host
      } else {
        // iterate up normal dom
        node = parentElement!
      }
    }

    node = originalNode
  }

  if (isNodeAttached(node)) {
    return node.getClientRects().length === 0
  }

  return true // hidden
}

// определяет, будет ли узел в конечном счете прикреплен к документу окна
export function isNodeAttached(node: Element) {
  let nodeRoot = node && getRootNode(node)
  let nodeRootHost = (nodeRoot as ShadowRoot)?.host
  let attached = false

  if (nodeRoot && nodeRoot !== node) {
    attached = !!(nodeRootHost?.ownerDocument?.contains(nodeRootHost) || node?.ownerDocument?.contains(node))

    while (!attached && nodeRootHost) {
      nodeRoot = getRootNode(nodeRootHost)
      nodeRootHost = (nodeRoot as ShadowRoot)?.host
      attached = !!nodeRootHost?.ownerDocument?.contains(nodeRootHost)
    }
  }

  return attached
}
