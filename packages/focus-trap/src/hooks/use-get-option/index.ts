import type { Nillable } from '@nado/tabbable'

import type { ActivateOptions, DeactivateOptions, FocusTrapOptions } from '../../types'

type OverrideOptions = ActivateOptions & DeactivateOptions

export function useGetOption(config: FocusTrapOptions) {
  const getOption = (
    configOverrideOptions: Nillable<OverrideOptions>,
    optionName: keyof OverrideOptions,
    configOptionName?: keyof FocusTrapOptions | undefined,
  ) =>
    configOverrideOptions && configOverrideOptions[optionName] !== undefined
      ? configOverrideOptions[optionName]
      : config[configOptionName || (optionName as keyof FocusTrapOptions)]

  return { getOption }
}
