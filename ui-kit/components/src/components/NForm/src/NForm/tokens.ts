import type { Arrayable } from '@nado/ui-kit-utils'
import type { InjectionKey, SetupContext } from 'vue'

import type { NFormItemProp } from '../NFormItem/NFormItem.model'
import type { NFormItemContext } from '../NFormItem/tokens'
import type { NFormValidateCallback, NFormValidationResult } from '../types'
import type { NFormEmits, NFormProps } from './NForm.model'

export type NFormContext = NFormProps & {
  emit: SetupContext<NFormEmits>['emit']
  // expose
  addField: (field: NFormItemContext) => void
  removeField: (field: NFormItemContext) => void
  resetFields: (props?: Arrayable<NFormItemProp>) => void
  clearValidate: (props?: Arrayable<NFormItemProp>) => void
  validateField: (props?: Arrayable<NFormItemProp>, callback?: NFormValidateCallback) => NFormValidationResult
}

export const FORM_CONTEXT_INJECTION_KEY: InjectionKey<NFormContext> = Symbol('FORM_CONTEXT_INJECTION_KEY')
