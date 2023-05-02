import { isNil, type Nillable } from '@nado/ui-kit-utils'
import { type ComputedRef, type SetupContext } from 'vue'

import type { NTableEmits } from '../NTable.model'
import type { NTableColumnInner } from '../types'

export interface SortColumn {
  name: string
  order: 'ASC' | 'DESC'
}

// export interface Request {
//   sort: Ref<SortColumn[]>
//   page: Ref<Nillable<number>>
//   pageSize: Ref<Nillable<number>>
// }

export interface Request {
  sort: SortColumn[]
  page: Nillable<number>
  pageSize: Nillable<number>
}

export type SendRequest = (payload: Partial<Request>) => void

export function useTableRequest(columnList: ComputedRef<NTableColumnInner[]>, emit: SetupContext<NTableEmits>['emit']) {
  const request: Request = {
    sort: columnList.value
      .filter((el) => el.sortOrder !== '')
      .map((item) => ({
        name: item.name,
        order: item.sortOrder as SortColumn['order'],
      })),
    page: undefined,
    pageSize: undefined,
  }

  function sendRequest(payload: Partial<Request>) {
    Object.keys(payload).forEach((key) => {
      const val = payload[key as keyof Request]

      if (!isNil(val)) {
        request[key as keyof Request] = val as SortColumn[] & number
      }
    })

    emit('request', request)
  }

  return {
    sendRequest,
  }
}
