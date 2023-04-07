import { isClient } from '@nado/ui-kit-utils'
import type { Modifier } from '@popperjs/core'
import { type MaybeRef, unrefElement } from '@vueuse/core'
import type { ComponentPublicInstance } from 'vue'

import type { PopperCoreConfigProps } from './popper-content.model'
import type { Measurable } from './tokens'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildPopperOptions(props: PopperCoreConfigProps, modifiers: Modifier<any, any>[] = []) {
  const { placement, strategy, popperOptions } = props
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers],
  }

  deriveExtraModifiers(options, popperOptions?.modifiers)

  return options
}

export function unwrapMeasurableEl($el: MaybeRef<Measurable | undefined | ComponentPublicInstance>) {
  if (!isClient) {
    return
  }

  return unrefElement($el as HTMLElement)
}

function genModifiers(options: PopperCoreConfigProps) {
  const { offset, gpuAcceleration, fallbackPlacements } = options

  return [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
      },
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements,
      },
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration,
      },
    },
  ]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deriveExtraModifiers(options: any, modifiers: PopperCoreConfigProps['popperOptions']['modifiers']) {
  if (modifiers) {
    options.modifiers = [...options.modifiers, ...(modifiers ?? [])]
  }
}
