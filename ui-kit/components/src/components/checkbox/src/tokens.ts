import type { InjectionKey, ToRefs, WritableComputedRef } from 'vue'

import type { NCheckboxGroupProps } from './checkbox-group.model'

type CheckboxGroupContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue?: WritableComputedRef<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeEvent?: (...args: any) => any
} & ToRefs<Pick<NCheckboxGroupProps, 'size' | 'min' | 'max' | 'disabled' | 'validateEvent' | 'fill' | 'textColor'>>

export const CHECKBOX_GROUP_INJECTION_KEY: InjectionKey<CheckboxGroupContext> = Symbol('CHECKBOX_GROUP_INJECTION_KEY')
