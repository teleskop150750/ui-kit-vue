import type { RuleItem } from '@nado/async-validator'
import type { Arrayable } from '@ui/utils'

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}
