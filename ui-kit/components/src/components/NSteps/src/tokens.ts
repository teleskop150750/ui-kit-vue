import type { InjectionKey, Ref } from 'vue'

import type { NStepsProps } from './NSteps.model'
import type { StepItemState } from './types'

export interface NStepsContext {
  props: NStepsProps
  steps: Ref<StepItemState[]>
}

export const STEPS_INJECTION_KEY: InjectionKey<NStepsContext> = Symbol('STEPS_INJECTION_KEY')
