import { isObject } from '@nado/ui-kit-utils'
import { type ComputedRef, type SetupContext } from 'vue'

import type { NTableEmits } from '../NTable.model'
import type { NTableColumn, NTableColumnInner } from '../types'
import type { SendRequest, SortColumn } from './useTableRequest'

export const SORT_ORDER_LIST = ['', 'ASC', 'DESC'] as const

export type NTableColumnSortOrder = (typeof SORT_ORDER_LIST)[number]

interface Props {
  sendRequest: SendRequest
  columnList: ComputedRef<NTableColumnInner[]>
  emit: SetupContext<NTableEmits>['emit']
}

export function useTableOrderSort({ sendRequest, columnList, emit }: Props) {
  function sort(column: NTableColumn | NTableColumn['name'], sortOrder?: NTableColumnInner['sortOrder']) {
    const newColumns = changeSortColumnInList(column, columnList, sortOrder)

    emit('update:columns', newColumns)
    emit('updateSort', newColumns)

    const sortColumns = newColumns
      .filter((el) => el.sortOrder !== '')
      .map((item) => ({
        name: item.name,
        order: item.sortOrder as SortColumn['order'],
      }))

    sendRequest({
      sort: sortColumns,
    })
  }

  return {
    sort,
  }
}

function changeSortColumnInList(
  column: NTableColumn | NTableColumn['name'],
  columnList: ComputedRef<NTableColumnInner[]>,
  sortOrder?: NTableColumnInner['sortOrder'],
): NTableColumnInner[] {
  const columnName = isObject(column) ? column.name : column

  return columnList.value.map((el) => {
    if (el.name !== columnName) {
      return el
    }

    return {
      ...el,
      sortOrder: getSortOrder(el, sortOrder),
    }
  })
}

function getSortOrder(column: NTableColumnInner, sortOrder?: NTableColumnInner['sortOrder']) {
  if (sortOrder !== undefined) {
    return sortOrder
  }

  return getNextSortOrder(column.sortOrder)
}

function getNextSortOrder(sortOrder: NTableColumnInner['sortOrder']): (typeof SORT_ORDER_LIST)[number] {
  const maxIndex = SORT_ORDER_LIST.length - 1
  const currentIndex = SORT_ORDER_LIST.indexOf(sortOrder)

  if (currentIndex === -1) {
    return SORT_ORDER_LIST[0]
  }

  let newIndex = currentIndex + 1

  if (newIndex > maxIndex) {
    newIndex = 0
  }

  return SORT_ORDER_LIST[newIndex]!
}
