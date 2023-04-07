import { type ClassValue, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes, PropType, StyleValue } from 'vue'

import type NScrollbar from './NScrollbar.vue'

export const nScrollbarProps = {
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  native: {
    type: Boolean,
    default: false,
  },
  wrapStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: '',
  },
  wrapClass: {
    type: [String, Array] as PropType<ClassValue>,
    default: '',
  },
  viewClass: {
    type: [String, Array] as PropType<ClassValue>,
    default: '',
  },
  viewStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
    default: '',
  },
  noResize: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
  always: {
    type: Boolean,
    default: false,
  },
  minSize: {
    type: Number,
    default: 20,
  },
} as const

export type NScrollbarProps = ExtractPropTypes<typeof nScrollbarProps>

export const nScrollbarEmits = {
  scroll: ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }) =>
    [scrollTop, scrollLeft].every(isNumber),
}
export type NScrollbarEmits = typeof nScrollbarEmits

export type NScrollbarInstance = InstanceType<typeof NScrollbar>
