// import type { ButtonProps } from '@ui/components/button'
import type { InjectionKey } from 'vue'

// export interface ButtonGroupContext {
//   size?: ButtonProps['size']
//   type?: ButtonProps['type']
// }

export const BUTTON_GROUP_INJECTION_KEY: InjectionKey<any> = Symbol('BUTTON_GROUP_INJECTION_KEY')
