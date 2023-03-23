import { useSizeProp } from '@ui/hooks/use-size'
import type { Language } from '@ui/locale'
import { buildProps, definePropType } from '@ui/utils'
import type { Component, ExtractPropTypes } from 'vue'

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
   * @description global Initial zIndex
   */
  zIndex: Number,
} as const)
export type NConfigProviderProps = ExtractPropTypes<typeof nConfigProviderProps>
