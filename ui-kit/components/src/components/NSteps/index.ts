import { withInstall, withNoopInstall } from '@nado/ui-kit-utils'

import Step from './src/NStep.vue'
import Steps from './src/NSteps.vue'

export const NSteps = withInstall(Steps, {
  Step,
})
export const NStep = withNoopInstall(Step)

export * from './src/NStep.model'
export * from './src/NSteps.model'
