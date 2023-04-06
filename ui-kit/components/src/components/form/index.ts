import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Form from './src/form/form.vue'
import FormItem from './src/form-item/form-item.vue'

export const NForm = withInstall(Form, {
  FormItem,
})
export const NFormItem = withNoopInstall(FormItem)

export * from './src/form/form.model'
export * from './src/form/hooks'
export * from './src/form/types'
export * from './src/form-item/form-item.model'
export * from './src/hooks'
export * from './src/tokens'
