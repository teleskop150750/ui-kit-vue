import { CHANGE_EVENT, type ComponentSize, UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { NIconArrowDown, NIconCircleClose } from '@nado/ui-kit-icons-vue'
import { buildProps, iconPropType, isValidComponentSize } from '@nado/ui-kit-utils'
import { type Options, placements } from '@popperjs/core'
import type { ExtractPropTypes, PropType } from 'vue'

import { nTagProps } from '../../tag'
import { useTooltipContentProps } from '../../tooltip'
import type NSelect from './NOption.vue'

export const selectProps = buildProps({
  name: String,
  id: String,
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  automaticDropdown: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  effect: {
    type: String as PropType<'light' | 'dark' | string>,
    default: 'light',
  },
  disabled: Boolean,
  clearable: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  loading: Boolean,
  popperClass: {
    type: String,
    default: '',
  },
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({} as Partial<Options>),
  },
  remote: Boolean,
  loadingText: String,
  noMatchText: String,
  noDataText: String,
  remoteMethod: Function,
  filterMethod: Function,
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0,
  },
  placeholder: {
    type: String,
  },
  defaultFirstOption: Boolean,
  reserveKeyword: {
    type: Boolean,
    default: true,
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  collapseTags: Boolean,
  collapseTagsTooltip: {
    type: Boolean,
    default: false,
  },
  maxCollapseTags: {
    type: Number,
    default: 1,
  },
  teleported: useTooltipContentProps.teleported,
  persistent: {
    type: Boolean,
    default: true,
  },
  clearIcon: {
    type: iconPropType,
    default: NIconCircleClose,
  },
  fitInputWidth: {
    type: Boolean,
    default: false,
  },
  suffixIcon: {
    type: iconPropType,
    default: NIconArrowDown,
  },
  tagMod: { ...nTagProps.mod, default: 'solid' },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  remoteShowSuffix: {
    type: Boolean,
    default: false,
  },
  suffixTransition: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String,
    values: placements,
    default: 'bottom-start',
  },
})

export const selectEmits = [
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  'removeTag',
  'clear',
  'visibleChange',
  'focus',
  'blur',
] as const

export type NSelectEmits = typeof selectEmits

export type NSelectProps = ExtractPropTypes<typeof selectProps>

export type NSelectInstance = InstanceType<typeof NSelect>
