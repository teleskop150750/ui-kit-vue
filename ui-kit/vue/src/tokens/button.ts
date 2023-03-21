import type { ButtonProps } from '@ui/components/button'
import type { InjectionKey } from 'vue'

export interface ButtonGroupContext {
  size?: ButtonProps['size']
  appearance?: ButtonProps['appearance']
}

export const BUTTON_GROUP_INJECTION_KEY: InjectionKey<ButtonGroupContext> = Symbol('BUTTON_GROUP_INJECTION_KEY')
