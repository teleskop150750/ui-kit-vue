import {
  NIconCircleCheck,
  NIconCircleClose,
  NIconCircleCloseFilled,
  NIconClose,
  NIconInfoFilled,
  NIconLoading,
  NIconSuccessFilled,
  NIconWarningFilled,
} from '@nado/ui-kit-icons-vue'
import type { Component } from 'vue'

import { definePropType } from './props'

export const iconPropType = definePropType<string | Component>([String, Object, Function])

export const CloseComponents = {
  Close: NIconClose,
} as const

export const TypeComponents = {
  Close: NIconClose,
  SuccessFilled: NIconSuccessFilled,
  InfoFilled: NIconInfoFilled,
  WarningFilled: NIconWarningFilled,
  CircleCloseFilled: NIconCircleCloseFilled,
} as const

export const TypeComponentsMap = {
  success: NIconSuccessFilled,
  warning: NIconWarningFilled,
  error: NIconCircleCloseFilled,
  info: NIconInfoFilled,
} as const

export const ValidateComponentsMap = {
  validating: NIconLoading,
  success: NIconCircleCheck,
  error: NIconCircleClose,
} as const
