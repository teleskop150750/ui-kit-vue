import { type Arrayable, isArray } from '@nado/ui-kit-utils'
import { type Ref, unref } from 'vue'

import type { TooltipTriggerType } from './tooltip-trigger.model'

export function isTriggerType(trigger: Arrayable<TooltipTriggerType>, type: TooltipTriggerType) {
  if (isArray(trigger)) {
    return trigger.includes(type)
  }

  return trigger === type
}

export function whenTrigger(
  trigger: Ref<Arrayable<TooltipTriggerType>>,
  type: TooltipTriggerType,
  handler: (e: Event) => void,
) {
  return (e: Event) => {
    isTriggerType(unref(trigger), type) && handler(e)
  }
}
