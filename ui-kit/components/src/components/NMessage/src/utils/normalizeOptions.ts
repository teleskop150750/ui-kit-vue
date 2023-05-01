import { debugWarn, isElement, isFunction, isString, isVNode } from '@nado/ui-kit-utils'

import {
  messageDefaults,
  type MessageOptions,
  type MessageParams,
  type MessageParamsNormalized,
} from '../NMessage.model'

export function normalizeOptions(params?: MessageParams) {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? ({ message: params } as MessageOptions)
      : params

  const normalized = {
    ...messageDefaults,
    ...options,
  }

  if (!normalized.appendTo) {
    normalized.appendTo = document.body
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo)

    // should fallback to default value with a warning
    if (!isElement(appendTo)) {
      debugWarn('NMessage', 'the appendTo option is not an HTMLElement. Falling back to document.body.')
      appendTo = document.body
    }

    normalized.appendTo = appendTo
  }

  return normalized as MessageParamsNormalized
}
