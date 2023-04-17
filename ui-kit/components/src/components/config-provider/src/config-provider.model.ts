import { useSizeProp } from '@nado/ui-kit-hooks'
import type { Language } from '@nado/ui-kit-locale'
import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { Component, ExtractPropTypes } from 'vue'

import type { MessageConfigContext } from '../../message/src/message.model'
import type { NConfigProvider } from '..'

export interface ExperimentalFeatures {
  // TO BE Defined
}

export const nConfigProviderProps = buildProps({
  locale: {
    type: definePropType<Language>(Object),
  },

  routerComponent: {
    type: definePropType<Component>(Object),
  },
  /**
   * @description global component size
   */
  size: useSizeProp,
  /**
   * @description message related configuration, [see the following table](#message-attributes)
   */
  message: {
    type: definePropType<MessageConfigContext>(Object),
  },
  /**
   * @description global Initial zIndex
   */
  zIndex: Number,
} as const)
export type NConfigProviderProps = ExtractPropTypes<typeof nConfigProviderProps>

export type NConfigProviderInstance = InstanceType<typeof NConfigProvider>
