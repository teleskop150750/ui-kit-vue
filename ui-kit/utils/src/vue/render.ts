import type { Slot } from 'vue'

import type { Nillable } from '../typescript'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hSlot(slot: Nillable<Slot>, otherwise: any = undefined) {
  return slot !== undefined ? slot() || otherwise : otherwise
}

export function hUniqueSlot(slot: Nillable<Slot>, otherwise: Array<unknown>) {
  if (slot !== undefined) {
    const vNode = slot()

    if (vNode !== undefined && vNode !== null) {
      return [...vNode]
    }
  }

  return otherwise
}

/**
 * Source definitely exists,
 * so it's merged with the possible slot
 */
export function hMergeSlot(slot: Nillable<Slot>, source: Array<unknown>) {
  // eslint-disable-next-line unicorn/prefer-spread
  return slot !== undefined ? source.concat(slot()) : source
}

/**
 * Merge with possible slot,
 * even if source might not exist
 */
export function hMergeSlotSafely(slot: Nillable<Slot>, source: Array<unknown>) {
  if (slot === undefined) {
    return source
  }

  // eslint-disable-next-line unicorn/prefer-spread
  return source !== undefined ? source.concat(slot()) : slot()
}
