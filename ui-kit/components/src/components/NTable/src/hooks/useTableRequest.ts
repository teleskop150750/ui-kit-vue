import type { SetupContext } from 'vue'

import type { NTableEmits } from '../NTable.model'
import type { NTableColumnInner } from '../types'

export function useTableRequest(columnList: NTableColumnInner[], emit: SetupContext<NTableEmits>['emit']) {
  const request = {
    sort: getColumnSort(columnList),
    page: 0,
    limit: 0,
  }

  emit('request', request)
}

interface SortColumn {
  name: string
  order: 'ASC' | 'DESC'
}

function getColumnSort(columnList: NTableColumnInner[]): SortColumn[] {
  return columnList
    .filter((el) => el.sortOrder !== '')
    .map((item) => ({ name: item.name, order: item.sortOrder as SortColumn['order'] }))
}
