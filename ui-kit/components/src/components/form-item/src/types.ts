import type { RuleItem } from '@nado/async-validator'
import type { Arrayable } from '@nado/ui-kit-utils'

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}
