import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes, HTMLAttributes, StyleValue } from 'vue'

import { createCollectionWithScope } from '../../collection'

export const nPovingFocusGroupProps = buildProps({
  style: { type: definePropType<StyleValue>([String, Array, Object]) },
  currentTabId: {
    type: definePropType<string | undefined>(String),
  },
  defaultCurrentTabId: String,
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
})

export const nPovingFocusGroupEmits = {
  currentTabIdChange: (_tabbedId: string) => true,
  entryFocus: (..._val: any[]) => true,
} as const

export type NRovingFocusGroupProps = ExtractPropTypes<typeof nPovingFocusGroupProps>
export type NPovingFocusGroupEmits = typeof nPovingFocusGroupEmits

const { NCollection, NCollectionItem, COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY } =
  createCollectionWithScope('NRovingFocusGroup')

export {
  NCollection,
  NCollectionItem,
  COLLECTION_INJECTION_KEY as ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
}
