import type { InjectionKey } from 'vue'

import type { NButtonProps } from './button.model'

export interface ButtonGroupContext {
  size?: NButtonProps['size'] | undefined
  appearance?: NButtonProps['appearance'] | undefined
}

export const BUTTON_GROUP_INJECTION_KEY: InjectionKey<ButtonGroupContext> = Symbol('BUTTON_GROUP_INJECTION_KEY')
