/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey, Ref } from 'vue'

import type { OptionSate } from './hooks'
import type { SelectVModelValue } from './NSelect.model'

interface SelectGroupContext {
  disabled: boolean
}

export interface QueryChangeCtx {
  query: string | number | boolean
}

export interface SelectContext {
  props: {
    multiple?: boolean
    multipleLimit?: number
    valueKey?: string
    modelValue?: string | number | unknown | unknown[]
    popperClass?: string
    remote?: boolean
    fitInputWidth?: boolean
  }
  queryChange: Ref<QueryChangeCtx>
  groupQueryChange: Ref<string>
  selectRootRef: HTMLElement
  options: Map<SelectVModelValue, SelectOptionProxy>
  cachedOptions: Map<SelectVModelValue, SelectOptionProxy>
  hoverIndex: number
  optionsCount: number
  filteredOptionsCount: number
  optionsArray: any[]
  selected: any | any[]
  setSelected(): void
  addOption(vm: SelectOptionProxy): void
  deleteOption(key: SelectVModelValue, vm: SelectOptionProxy): void
  handleOptionSelect(vm: SelectOptionProxy, byClick: boolean): void
}

// For individual build sharing injection key, we had to make `Symbol` to string
export const SELECT_GROUP_INJECTION_KEY: InjectionKey<SelectGroupContext> = Symbol('SELECT_GROUP_INJECTION_KEY')

export const SELECT_INJECTION_KEY: InjectionKey<SelectContext> = Symbol('SELECT_INJECTION_KEY')

export interface SelectOptionProxy {
  value: SelectVModelValue
  label: string | number
  created: boolean
  states: OptionSate
  disabled: boolean
  currentLabel: string
  itemSelected: boolean
  isDisabled: boolean
  selectContext: SelectContext
  hoverItem: () => void
  visible: boolean
  hover: boolean
  $el: HTMLElement
  selectOptionClick: () => void
}
