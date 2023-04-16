import type { Mutable } from '@nado/ui-kit-utils'
import { type ComponentInternalInstance, shallowReactive, type VNode } from 'vue'

import type { MessageHandler, NMessageProps } from './message.model'

export interface MessageContext {
  id: string
  vnode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
  props: Mutable<NMessageProps>
}

export const instances: MessageContext[] = shallowReactive([])

export function getInstance(id: string) {
  const idx = instances.findIndex((instance) => instance.id === id)
  const current = instances[idx]
  let prev: MessageContext | undefined

  if (idx > 0) {
    prev = instances[idx - 1]
  }

  return { current, prev }
}

export function getLastOffset(id: string): number {
  const { prev } = getInstance(id)

  if (!prev) {
    return 0
  }

  return prev.vm.exposed!.bottom.value
}

export function getOffsetOrSpace(id: string, offset: number) {
  const idx = instances.findIndex((instance) => instance.id === id)

  return idx > 0 ? 20 : offset
}
