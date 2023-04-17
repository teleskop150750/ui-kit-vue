import { buildProps, definePropType } from '@nado/ui-kit-utils'
import type { ZIndexProperty } from 'csstype'
import type { ExtractPropTypes } from 'vue'

export const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true,
  },
  customMaskEvent: {
    type: Boolean,
    default: false,
  },
  overlayClass: {
    type: definePropType<string | string[] | Record<string, boolean>>([String, Array, Object]),
  },
  zIndex: {
    type: definePropType<ZIndexProperty>([String, Number]),
  },
} as const)

export const overlayEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type OverlayEmits = typeof overlayEmits
