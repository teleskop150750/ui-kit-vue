import { useLocale } from '@nado/ui-kit-hooks'
import type { Arrayable, Nillable } from '@nado/ui-kit-utils'
import { reactive } from 'vue'

import type { NSelectProps, SelectVModelValue } from '../select.model'
import type { SelectOptionProxy } from '../token'

export interface SelectedItem {
  currentLabel: string | number | boolean
  hitState: boolean
  isDisabled: boolean
  value: SelectVModelValue
}

export function useSelectState(props: NSelectProps) {
  const { t } = useLocale()

  return reactive({
    options: new Map<SelectVModelValue, SelectOptionProxy>(),
    cachedOptions: new Map<SelectVModelValue, SelectOptionProxy>(),
    createdLabel: undefined as Nillable<string>,
    createdSelected: false,
    selected: (props.multiple ? [] : {}) as Arrayable<SelectedItem>,
    inputLength: 20,
    inputWidth: 0,
    optionsCount: 0,
    filteredOptionsCount: 0,
    visible: false,
    softFocus: false,
    selectedLabel: '' as string | number | boolean,
    hoverIndex: -1,
    query: '' as string | number | boolean,
    previousQuery: undefined as Nillable<string | number | boolean>,
    isInputHover: false,
    cachedPlaceHolder: '' as string | (() => string),
    currentPlaceholder: t('nado.select.placeholder') as string | (() => string),
    menuVisibleOnFocus: false,
    isOnComposition: false,
    isSilentBlur: false,
    prefixWidth: 11,
    tagInMultiLine: false,
    mouseEnter: false,
  })
}

export type SelectState = ReturnType<typeof useSelectState>
