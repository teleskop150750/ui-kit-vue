import type { InjectionKey, ToRefs, WritableComputedRef } from 'vue'

import type { NCheckboxGroupProps } from './NCheckboxGroup.model'

type NCheckboxGroupContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue?: WritableComputedRef<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeEvent?: (...args: any) => any
} & ToRefs<Pick<NCheckboxGroupProps, 'size' | 'min' | 'max' | 'disabled' | 'validateEvent'>>

export const CHECKBOX_GROUP_INJECTION_KEY: InjectionKey<NCheckboxGroupContext> = Symbol('CHECKBOX_GROUP_INJECTION_KEY')
