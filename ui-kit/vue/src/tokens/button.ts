import type { NButtonProps } from '@ui/components/button'
import type { InjectionKey } from 'vue'

export interface ButtonGroupContext {
  size?: NButtonProps['size'] | undefined
  appearance?: NButtonProps['appearance'] | undefined
}

export const BUTTON_GROUP_INJECTION_KEY: InjectionKey<ButtonGroupContext> = Symbol('BUTTON_GROUP_INJECTION_KEY')
