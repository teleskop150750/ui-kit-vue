import { messages as defaultMessagesThere, newMessages } from '../../messages'
import type { InternalValidateMessages, ValidateOption } from '../../types'
import { deepMerge } from '../../utils'

export function getOptionsWithMessages(initMessages: InternalValidateMessages, optionsThere: ValidateOption) {
  const options = { ...optionsThere }

  if (!options.messages) {
    options.messages = initMessages

    return options
  }

  let messages = initMessages

  if (messages === defaultMessagesThere) {
    messages = newMessages()
  }

  deepMerge(messages, options.messages)
  options.messages = messages

  return options
}
