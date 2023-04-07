import type { ComponentSize } from '@nado/ui-kit-constants'
import type { InjectionKey } from 'vue'

import type { NFormValidateCallback, NFormValidationResult } from '../../form/src/types'
import type { NFormItemProps, NFormItemValidateState } from './form-item.model'

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

export const FORM_ITEM_INJECTION_KEY: InjectionKey<NFormItemContext> = Symbol('FORM_ITEM_INJECTION_KEY')
