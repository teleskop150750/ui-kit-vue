import type { RouteLocation } from '@ui/hooks'
import { computed, type ComputedRef } from 'vue'

import type { NPaginationQueryProps } from '../pagination.model'

export function usePaginationQuery(
  paginationRoute: ComputedRef<RouteLocation | undefined>,
  props: NPaginationQueryProps,
) {
  const queryType = computed(() => props.queryType)

  const pageNumberOrOffsetQueryParamName = computed(() => {
    if (queryType.value === 'number') {
      return props.queryPageNumber
    }

    if (queryType.value === 'offset') {
      return props.queryPageOffset
    }

    return ''
  })

  const pageSizeQueryParamName = computed(() => {
    if (queryType.value === 'number') {
      return props.queryPageSize
    }

    if (queryType.value === 'offset') {
      return props.queryPageLimit
    }

    return ''
  })

  function getPageInQuery() {
    const pageSizeQueryVal = computed(() => {
      if (!paginationRoute.value) {
        return undefined
      }

      if (!pageSizeQueryParamName.value) {
        return undefined
      }

      const res = paginationRoute.value.query[pageSizeQueryParamName.value] as string | undefined

      if (!res) {
        return undefined
      }

      return Number.parseInt(res)
    })

    const pageNumberOrOffsetQueryVal = computed(() => {
      if (!paginationRoute.value) {
        return undefined
      }

      if (!pageNumberOrOffsetQueryParamName.value) {
        return undefined
      }

      const res = paginationRoute.value.query[pageNumberOrOffsetQueryParamName.value] as string | undefined

      if (!res) {
        return undefined
      }

      return Number.parseInt(res)
    })

    const pageNumberQueryVal = computed(() => {
      if (pageSizeQueryVal.value === undefined || pageNumberOrOffsetQueryVal.value === undefined) {
        return undefined
      }

      if (queryType.value === 'number') {
        return pageNumberOrOffsetQueryVal.value
      }

      if (queryType.value === 'offset') {
        if (pageNumberOrOffsetQueryVal.value === 0) {
          return 1
        }

        return pageNumberOrOffsetQueryVal.value / pageSizeQueryVal.value + 1
      }

      return undefined
    })

    return {
      pageSizeQueryVal,
      pageNumberOrOffsetQueryVal,
      pageNumberQueryVal,
    }
  }

  return {
    queryType,
    pageNumberOrOffsetQueryParamName,
    pageSizeQueryParamName,
    getPageInQuery,
  }
}
