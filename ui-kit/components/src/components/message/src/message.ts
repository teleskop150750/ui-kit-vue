import { isClient, isFunction, isNumber, isVNode, type Nullable } from '@nado/ui-kit-utils'
import { type AppContext, createVNode, render } from 'vue'

import { messageConfig } from '../../config-provider'
import { instances, type MessageContext } from './instance'
import {
  type Message,
  type MessageFn,
  type MessageHandler,
  type MessageParamsNormalized,
  type messageType,
  messageTypes,
} from './message.model'
import NMessage from './NMessage.vue'
import { normalizeOptions } from './utils'

let seed = 1

// TODO: Since Notify.ts is basically the same like this file. So we could do some encapsulation against them to reduce code duplication.

function createMessage(
  { appendTo, ...options }: MessageParamsNormalized,
  context?: Nullable<AppContext>,
): MessageContext {
  const id = `message_${(seed += 1)}`
  const userOnClose = options.onClose

  const container = document.createElement('div')

  const props = {
    ...options,
    // now the zIndex will be used inside the message.vue component instead of here.
    // zIndex: nextIndex() + options.zIndex
    id,
    onClose: () => {
      userOnClose?.()
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      closeMessage(instance)
    },

    // clean message element preventing mem leak
    onDestroy: () => {
      // since the element is destroy, then the VNode should be collected by GC as well
      // we do not want cause any mem leak because we have returned vm as a reference to users
      // so that we manually set it to false.
      // eslint-disable-next-line unicorn/no-null
      render(null, container)
    },
  }
  const vnode = createVNode(
    NMessage,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message) ? props.message : () => props.message,
        }
      : undefined,
  )

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  vnode.appContext = context || message._context

  render(vnode, container)
  // instances will remove this item when close function gets called. So we do not need to worry about it.
  appendTo.append(container.firstElementChild!)

  const vm = vnode.component!

  const handler: MessageHandler = {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vm.exposed!.visible.value = false
    },
  }

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: (vnode.component as any).props,
  }

  return instance
}

function closeMessage(instance: MessageContext) {
  const idx = instances.indexOf(instance)

  if (idx === -1) {
    return
  }

  instances.splice(idx, 1)
  const { handler } = instance

  handler.close()
}

export function closeAll(type?: messageType): void {
  for (const instance of instances) {
    if (!type || type === instance.props.appearance) {
      instance.handler.close()
    }
  }
}

const message: MessageFn & Partial<Message> & { _context: Nullable<AppContext> } = (
  options = {},
  context = undefined,
) => {
  if (!isClient) {
    return { close: () => undefined }
  }

  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
    return { close: () => undefined }
  }

  const normalized = normalizeOptions(options)

  if (normalized.grouping && instances.length > 0) {
    const instance = instances.find(({ vnode: vm }) => vm.props?.message === normalized.message)

    if (instance) {
      instance.props.repeatNum += 1
      instance.props.appearance = normalized.appearance

      return instance.handler
    }
  }

  const instance = createMessage(normalized, context)

  instances.push(instance)

  return instance.handler
}

messageTypes.forEach((appearances) => {
  message[appearances] = (options = {}, appContext = undefined) => {
    const normalized = normalizeOptions(options)

    return message({ ...normalized, appearance: appearances }, appContext)
  }
})

message.closeAll = closeAll
// eslint-disable-next-line unicorn/no-null
message._context = null

export { message as Message }
