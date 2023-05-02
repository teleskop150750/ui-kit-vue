import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Form from './src/NForm/NForm.vue'
import FormItem from './src/NFormItem/NFormItem.vue'

// TODO переместить сюда NFormItem
export const NForm = withInstall(Form, {
  FormItem,
})

export const NFormItem = withNoopInstall(FormItem)

export * from './src/hooks'
export * from './src/NForm/hooks'
export * from './src/NForm/NForm.model'
export * from './src/NForm/tokens'
export * from './src/NFormItem/tokens'
export * from './src/types'
