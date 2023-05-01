import { type Arrayable, isArray } from '@nado/ui-kit-utils'
import { type Ref, unref } from 'vue'

import type { NTooltipTriggerType } from './NTooltipTrigger.model'

export function isTriggerType(trigger: Arrayable<NTooltipTriggerType>, type: NTooltipTriggerType) {
  if (isArray(trigger)) {
    return trigger.includes(type)
  }

  return trigger === type
}

export function whenTrigger(
  trigger: Ref<Arrayable<NTooltipTriggerType>>,
  type: NTooltipTriggerType,
  handler: (e: Event) => void,
) {
  return (e: Event) => {
    isTriggerType(unref(trigger), type) && handler(e)
  }
}
