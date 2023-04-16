import { buildProps, definePropType, iconPropType, isClient, type Mutable, mutable } from '@nado/ui-kit-utils'
import type { AppContext, ExtractPropTypes, VNode } from 'vue'

import type NMessage from './NMessage.vue'

export const messageTypes = ['success', 'info', 'warning', 'danger'] as const

export type messageType = (typeof messageTypes)[number]

export interface MessageConfigContext {
  max?: number
}

export const messageDefaults = mutable({
  customClass: '',
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: undefined,
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  appearance: 'info',
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never),
} as const)

export const nMessageProps = buildProps({
  /**
   * @description custom class name for Message
   */
  customClass: {
    type: String,
    default: messageDefaults.customClass,
  },
  /**
   * @description whether to center the text
   */
  center: {
    type: Boolean,
    default: messageDefaults.center,
  },
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString,
  },
  /**
   * @description display duration, millisecond. If set to 0, it will not turn off automatically
   */
  duration: {
    type: Number,
    default: messageDefaults.duration,
  },
  /**
   * @description custom icon component, overrides `type`
   */
  icon: {
    type: iconPropType,
    default: messageDefaults.icon,
  },
  /**
   * @description message dom id
   */
  id: {
    type: String,
    default: messageDefaults.id,
  },
  /**
   * @description message text
   */
  message: {
    type: definePropType<string | VNode | (() => VNode)>([String, Object, Function]),
    default: messageDefaults.message,
  },
  /**
   * @description callback function when closed with the message instance as the parameter
   */
  onClose: {
    type: definePropType<() => void>(Function),
    required: false,
  },
  /**
   * @description whether to show a close button
   */
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose,
  },
  /**
   * @description message type
   */
  appearance: {
    type: String,
    values: messageTypes,
    default: messageDefaults.appearance,
  },
  /**
   * @description set the distance to the top of viewport
   */
  offset: {
    type: Number,
    default: messageDefaults.offset,
  },
  /**
   * @description input box size
   */
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex,
  },
  /**
   * @description merge messages with the same content, type of VNode message is not supported
   */
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping,
  },
  /**
   * @description The number of repetitions, similar to badge, is used as the initial number when used with `grouping`
   */
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum,
  },
} as const)

export const nMessageEmits = {
  destroy: () => true,
}

export type NMessageProps = ExtractPropTypes<typeof nMessageProps>
export type NMessageEmits = typeof nMessageEmits
export type NMessageInstance = InstanceType<typeof NMessage>
export type MessageOptions = Partial<
  Mutable<
    Omit<NMessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>
export type MessageParams = MessageOptions | MessageOptions['message']
export type MessageParamsNormalized = Omit<NMessageProps, 'id'> & {
  /**
   * @description set the root element for the message, default to `document.body`
   */
  appendTo: HTMLElement
}
export type MessageOptionsWithType = Omit<MessageOptions, 'appearances'>
export type MessageParamsWithType = MessageOptionsWithType | MessageOptions['message']

export interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void
}

export interface MessageFn {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler
  closeAll(type?: messageType): void
}
export type MessageTypedFn = (options?: MessageParamsWithType, appContext?: null | AppContext) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  danger: MessageTypedFn
}
