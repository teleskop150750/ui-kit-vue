import type { Arrayable } from '@nado/ui-kit-utils'
import type { Schema } from 'yup'

export interface FormItemRule {
  rule: Schema
  trigger?: Arrayable<string>
}
