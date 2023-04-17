/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey, Ref } from 'vue'

interface SelectGroupContext {
  disabled: boolean
}

export interface QueryChangeCtx {
  query: string
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
  selectWrapper: HTMLElement
  cachedOptions: Map<any, any>
  hoverIndex: number
  optionsCount: number
  filteredOptionsCount: number
  options: Map<any, any>
  optionsArray: any[]
  selected: any | any[]
  setSelected(): void
  onOptionCreate(vm: SelectOptionProxy): void
  onOptionDestroy(key: number | string | Record<string, any>, vm: SelectOptionProxy): void
  handleOptionSelect(vm: unknown, byClick: boolean): void
}

// For individual build sharing injection key, we had to make `Symbol` to string
export const SELECT_GROUP_INJECTION_KEY: InjectionKey<SelectGroupContext> = Symbol('SELECT_GROUP_INJECTION_KEY')

export const SELECT_INJECTION_KEY: InjectionKey<SelectContext> = Symbol('SELECT_INJECTION_KEY')

export interface SelectOptionProxy {
  value: string | number | Record<string, string>
  label: string | number
  created: boolean
  disabled: boolean
  currentLabel: string
  itemSelected: boolean
  isDisabled: boolean
  select: SelectContext
  hoverItem: () => void
  visible: boolean
  hover: boolean
  selectOptionClick: () => void
}
