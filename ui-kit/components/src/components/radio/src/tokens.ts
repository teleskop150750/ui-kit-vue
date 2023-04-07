import type { InjectionKey } from 'vue'

import type { RadioGroupProps } from './radio-group.model'

export interface NRadioGroupContext extends RadioGroupProps {
  changeEvent: (val: RadioGroupProps['modelValue']) => void
}

export const N_RADIO_GROUP_INJECTION_KEY: InjectionKey<NRadioGroupContext> = Symbol('RADIO_GROUP_INJECTION_KEY')
