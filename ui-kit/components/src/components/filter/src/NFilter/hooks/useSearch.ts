import { isArray } from '@nado/ui-kit-utils'
import type { SetupContext } from 'vue'

import type { SelectVModel } from '../../../../select'
import type { NFilterEmits } from '../filter.model'

export function useSearch(emit: SetupContext<NFilterEmits>['emit']) {
  function updateSearch(val: string) {
    emit('update:search', val)
  }

  function updateSearchFields(searchFields: SelectVModel) {
    if (!isArray(searchFields)) {
      return
    }

    emit('update:searchFields', searchFields as string[])
  }

  return {
    updateSearch,
    updateSearchFields,
  }
}
