import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes, HTMLAttributes, StyleValue } from 'vue'

import { createCollectionWithScope } from '../../NCollection'

export const povingFocusGroupProps = buildProps({
  style: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  currentTabId: {
    type: definePropType<string | undefined>(String),
  },
  defaultCurrentTabId: {
    type: definePropType<string | undefined>(String),
  },
  loop: Boolean,
  dir: {
    type: String, // left for direction support
    values: ['ltr', 'rtl'],
    default: 'ltr',
  },
  orientation: {
    // left for orientation support
    type: definePropType<HTMLAttributes['aria-orientation']>(String),
  },

  onBlur: Function,
  onFocus: Function,
  onMousedown: Function,
} as const)

export const povingFocusGroupEmits = {
  currentTabIdChange: (_tabbedId: string) => true,
  entryFocus: (..._val: Event[]) => true,
} as const

export type NRovingFocusGroupProps = ExtractPropTypes<typeof povingFocusGroupProps>
export type NPovingFocusGroupEmits = typeof povingFocusGroupEmits

const { NCollection, NCollectionItem, COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY } =
  createCollectionWithScope('RovingFocusGroup')

export {
  NCollection,
  NCollectionItem,
  COLLECTION_INJECTION_KEY as ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as ROVING_FOCUS_COLLECTION_ITEM_INJECTION_KEY,
}
