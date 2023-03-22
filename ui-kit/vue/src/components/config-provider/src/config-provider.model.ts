import { useSizeProp } from '@ui/hooks'
import type { Language } from '@ui/locale'
import { buildProps, definePropType } from '@ui/utils'
import type { ExtractPropTypes } from 'vue'

export interface ExperimentalFeatures {
  // TO BE Defined
}

export const nConfigProviderProps = buildProps({
  locale: {
    type: definePropType<Language>(Object),
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
