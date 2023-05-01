import { CHANGE_EVENT, type ComponentSize, UPDATE_MODEL_EVENT } from '@nado/ui-kit-constants'
import { NIconArrowDown, NIconCircleClose } from '@nado/ui-kit-icons-vue'
import {
  buildProps,
  definePropType,
  iconPropType,
  isBoolean,
  isValidComponentSize,
  type Nillable,
} from '@nado/ui-kit-utils'
import { type Options, placements } from '@popperjs/core'
import type { ExtractPropTypes, PropType } from 'vue'

import { tagProps } from '../../NTag'
import { useTooltipContentProps } from '../../NTooltip'
import type NSelect from './NOption.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectVModelObject = Record<string, any>
export type SelectVModelValue = undefined | string | number | boolean | SelectVModelObject
export type SelectVModelList = Array<SelectVModelValue>
export type SelectVModel = Nillable<SelectVModelList | string | number | boolean | SelectVModelObject>

export const selectProps = buildProps({
  name: String,
  id: String,
  modelValue: {
    type: definePropType<SelectVModel>([Array, String, Number, Boolean, Object]),
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
  tagMod: {
    ...tagProps.mod,
    default: 'solid',
  },
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
} as const)

export const selectEmits = {
  [UPDATE_MODEL_EVENT]: (_val: SelectVModel) => true,
  [CHANGE_EVENT]: (_val: SelectVModel) => true,
  removeTag: (val: SelectVModelValue) => !!val,
  clear: () => true,
  visibleChange: (val: boolean) => isBoolean(val),
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  blur: (event: FocusEvent) => event instanceof FocusEvent,
} as const

export type NSelectEmits = typeof selectEmits
export type NSelectProps = ExtractPropTypes<typeof selectProps>
export type NSelectInstance = InstanceType<typeof NSelect>
