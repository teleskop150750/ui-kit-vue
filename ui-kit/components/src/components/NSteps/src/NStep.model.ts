import { buildProps, iconPropType } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NStep from './NStep.vue'

export const stepProps = buildProps({
  /**
   * @description step title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description step custom icon. Icons can be passed via named slot as well
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description step description
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * @description current status. It will be automatically set by Steps if not configured.
   */
  status: {
    type: String,
    values: ['', 'wait', 'process', 'finish', 'danger', 'success'],
    default: '',
  },
} as const)

export type StepProps = ExtractPropTypes<typeof stepProps>
export type StepInstance = InstanceType<typeof NStep>
