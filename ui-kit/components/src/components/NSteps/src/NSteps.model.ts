import { CHANGE_EVENT } from '@nado/ui-kit-constants'
import { buildProps, isNumber } from '@nado/ui-kit-utils'
import type { ExtractPropTypes } from 'vue'

import type NSteps from './NSteps.vue'

export const stepsProps = buildProps({
  /**
   * @description the spacing of each step, will be responsive if omitted. Supports percentage.
   */
  space: {
    type: [Number, String],
    default: '',
  },
  /**
   * @description current activation step
   */
  active: {
    type: Number,
    default: 0,
  },
  /**
   * @description display direction
   */
  direction: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical'],
  },
  /**
   * @description center title and description
   */
  alignCenter: {
    type: Boolean,
  },
  /**
   * @description whether to apply simple theme
   */
  simple: {
    type: Boolean,
  },
  /**
   * @description status of end step
   */
  finishStatus: {
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
    default: 'finish',
  },
  /**
   * @description status of current step
   */
  processStatus: {
    type: String,
    values: ['wait', 'process', 'finish', 'danger', 'success'],
    default: 'process',
  },
} as const)

export const stepsEmits = {
  [CHANGE_EVENT]: (newVal: number, oldVal: number) => [newVal, oldVal].every(isNumber),
} as const

export type NStepsProps = ExtractPropTypes<typeof stepsProps>
export type NStepsEmits = typeof stepsEmits
export type NStepsInstance = InstanceType<typeof NSteps>
