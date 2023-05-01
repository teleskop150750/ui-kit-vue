import { withInstall } from '@nado/ui-kit-utils'

import FormItem from '../NFormItem/src/NFormItem.vue'
import Form from './src/NForm.vue'

// TODO переместить сюда NFormItem
export const NForm = withInstall(Form, {
  FormItem,
})

export * from './src/hooks'
export * from './src/NForm.model'
export * from './src/shared'
export * from './src/tokens'
export * from './src/types'
