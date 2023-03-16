// TODO: NADO
// import type {
//   FormEmits,
//   FormItemProp,
//   FormItemProps,
//   FormItemValidateState,
//   FormLabelWidthContext,
//   FormProps,
// } from '@ui/components/form'
// import type { ComponentSize } from '@ui/constants'
// import type { Arrayable } from '@ui/utils'
// import type {
//   RuleItem,
//   ValidateError,
//   ValidateFieldsError,
// } from 'async-validator'
import type { InjectionKey } from 'vue'
// import type { InjectionKey, SetupContext, UnwrapRef } from 'vue'

// export interface FormItemRule extends RuleItem {
//   trigger?: Arrayable<string>
// }
// export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

// export type FormValidationResult = Promise<boolean>
// export type FormValidateCallback = (
//   isValid: boolean,
//   invalidFields?: ValidateFieldsError
// ) => void
// export interface FormValidateFailure {
//   errors: ValidateError[] | null
//   fields: ValidateFieldsError
// }

export type FormContext = any
// FormProps &
// UnwrapRef<FormLabelWidthContext> & {
//   emit: SetupContext<FormEmits>['emit']

//   // expose
//   addField: (field: FormItemContext) => void
//   removeField: (field: FormItemContext) => void
//   resetFields: (props?: Arrayable<FormItemProp>) => void
//   clearValidate: (props?: Arrayable<FormItemProp>) => void
//   validateField: (
//     props?: Arrayable<FormItemProp>,
//     callback?: FormValidateCallback
//   ) => FormValidationResult
// }

export type FormItemContext = any
// extends FormItemProps {
//   $el: HTMLDivElement | undefined
//   size: ComponentSize
//   validateState: FormItemValidateState
//   isGroup: boolean
//   labelId: string
//   inputIds: string[]
//   hasLabel: boolean
//   addInputId: (id: string) => void
//   removeInputId: (id: string) => void
//   validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult
//   resetField(): void
//   clearValidate(): void
// }

export const FORM_CONTEXT_INJECTION_KEY: InjectionKey<FormContext> = Symbol('FORM_CONTEXT_INJECTION_KEY')
export const FORM_ITEM_INJECTION_KEY: InjectionKey<FormItemContext> = Symbol('FORM_ITEM_INJECTION_KEY')
