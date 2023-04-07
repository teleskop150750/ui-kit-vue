import { withInstall } from '@nado/ui-kit-utils'

import FormItem from '../form-item/src/NFormItem.vue'
import Form from './src/NForm.vue'

export const NForm = withInstall(Form, {
  FormItem,
})

export * from './src/form.model'
export * from './src/hooks'
export * from './src/shared'
export * from './src/tokens'
export * from './src/types'
