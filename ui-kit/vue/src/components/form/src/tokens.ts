import type { NFormValidateCallback, NFormValidationResult } from '@ui/components/form/src/form/types'
import type { NFormItemProp, NFormItemValidateState } from '@ui/components/form/src/form-item/form-item.model'
import type { ComponentSize } from '@ui/constants'
import type { Arrayable } from '@vueuse/core'
import type { InjectionKey, SetupContext } from 'vue'

import type { NFormEmits, NFormProps } from './form/form.model'
import type { NFormItemProps } from './form-item/form-item.model'

export type NFormContext = NFormProps & {
  emit: SetupContext<NFormEmits>['emit']

  // expose
  addField: (field: NFormItemContext) => void
  removeField: (field: NFormItemContext) => void
  resetFields: (props?: Arrayable<NFormItemProp>) => void
  clearValidate: (props?: Arrayable<NFormItemProp>) => void
  validateField: (props?: Arrayable<NFormItemProp>, callback?: NFormValidateCallback) => NFormValidationResult
}

export interface NFormItemContext extends NFormItemProps {
  $el: HTMLDivElement | undefined
  size: ComponentSize
  validateState: NFormItemValidateState
  isGroup: boolean
  labelId: string
  inputIds: string[]
  hasLabel: boolean
  addInputId: (id: string) => void
  removeInputId: (id: string) => void
  validate: (trigger: string, callback?: NFormValidateCallback) => NFormValidationResult
  resetField(): void
  clearValidate(): void
}

export const FORM_CONTEXT_INJECTION_KEY: InjectionKey<NFormContext> = Symbol('FORM_CONTEXT_INJECTION_KEY')
export const FORM_ITEM_INJECTION_KEY: InjectionKey<NFormItemContext> = Symbol('FORM_ITEM_INJECTION_KEY')
