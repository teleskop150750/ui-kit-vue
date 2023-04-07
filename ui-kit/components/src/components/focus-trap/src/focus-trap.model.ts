import type { FocusTrapOptions } from '@nado/focus-trap'
import type {} from '@nado/tabbable'
import { buildProps, isBoolean } from '@nado/ui-kit-utils'
import type { ExtractPropTypes, PropType } from 'vue'

import type { NFocusTrap } from './NFocusTrap'

export const focusTrapProps = buildProps({
  active: {
    // TODO: could be options for activate but what about the options for deactivating?
    type: Boolean,
    default: true,
  },
  escapeDeactivates: {
    type: [Boolean, Function] as PropType<FocusTrapOptions['escapeDeactivates']>,
    default: true,
  },
  returnFocusOnDeactivate: {
    type: Boolean,
    default: true,
  },
  allowOutsideClick: {
    type: [Boolean, Function] as PropType<FocusTrapOptions['allowOutsideClick']>,
    default: true,
  },
  clickOutsideDeactivates: {
    type: [Boolean, Function] as PropType<FocusTrapOptions['clickOutsideDeactivates']>,
  },
  initialFocus: {
    type: [String, Function, Boolean] as PropType<FocusTrapOptions['initialFocus']>,
  },
  fallbackFocus: {
    type: [String, Function] as PropType<FocusTrapOptions['fallbackFocus']>,
  },
  checkCanFocusTrap: {
    type: Function as PropType<FocusTrapOptions['checkCanFocusTrap']>,
  },
  checkCanReturnFocus: {
    type: Function as PropType<FocusTrapOptions['checkCanReturnFocus']>,
  },
  delayInitialFocus: {
    type: Boolean as PropType<FocusTrapOptions['delayInitialFocus']>,
    default: true,
  },
  document: {
    type: Object as PropType<FocusTrapOptions['document']>,
  },
  preventScroll: {
    type: Boolean,
    default: false,
  },
  setReturnFocus: {
    type: [Object, String, Boolean, Function] as PropType<FocusTrapOptions['setReturnFocus']>,
  },
  tabbableOptions: {
    type: Object as PropType<FocusTrapOptions['tabbableOptions']>,
  },
} as const)

export const focusTrapEmits = {
  'update:active': (val: boolean) => isBoolean(val),
  activate: () => true,
  deactivate: () => true,
  escapeDeactivate: () => true,
  postActivate: () => true,
  postDeactivate: () => true,
  postEscapeDeactivate: () => true,
}

export type FocusTrapProps = ExtractPropTypes<typeof focusTrapProps>

export type FocusTrapEmits = typeof focusTrapEmits

export type FocusTrapInstance = InstanceType<typeof NFocusTrap>
