import type { RouteLocation } from '@ui/hooks'
import { computed, type ComputedRef } from 'vue'

import type { NPaginationQueryProps } from '../pagination.model'

export interface PageFromQuery {
  current?: number | undefined
  size?: number | undefined
}

export function usePaginationQuery(route: ComputedRef<RouteLocation | undefined>) {
  function getQueryPageParams(props: NPaginationQueryProps) {
    const pageNumberOrOffsetQueryParamName = computed(() => {
      if (props.queryType === 'number') {
        return props.queryPageNumber
      }

      if (props.queryType === 'offset') {
        return props.queryPageOffset
      }

      return undefined
    })

    const pageSizeQueryParamName = computed(() => {
      if (props.queryType === 'number') {
        return props.queryPageSize
      }

      if (props.queryType === 'offset') {
        return props.queryPageLimit
      }

      return undefined
    })

    function getQueryPageParamsName() {
      return {
        pageNumberOrOffsetQueryParamName,
        pageSizeQueryParamName,
      }
    }

    function getPageInQuery() {
      const queryPageSize = computed(() => {
        if (!route.value) {
          return undefined
        }

        if (!pageSizeQueryParamName.value) {
          return undefined
        }

        const res = route.value.query[pageSizeQueryParamName.value] as string | undefined

        if (!res) {
          return undefined
        }

        return Number.parseInt(res)
      })

      const queryPageNumberOrOffset = computed(() => {
        if (!route.value) {
          return undefined
        }

        if (!pageNumberOrOffsetQueryParamName.value) {
          return undefined
        }

        const res = route.value.query[pageNumberOrOffsetQueryParamName.value] as string | undefined

        if (!res) {
          return undefined
        }

        return Number.parseInt(res)
      })

      const queryPageNumber = computed(() => {
        if (queryPageSize.value === undefined || queryPageNumberOrOffset.value === undefined) {
          return undefined
        }

        if (props.queryType === 'number') {
          return queryPageNumberOrOffset.value
        }

        if (props.queryType === 'offset') {
          if (queryPageNumberOrOffset.value === 0) {
            return 1
          }

          return queryPageNumberOrOffset.value / queryPageSize.value + 1
        }

        return undefined
      })

      return {
        queryPageSize,
        queryPageNumberOrOffset,
        queryPageNumber,
      }
    }

    return {
      getQueryPageParamsName,
      getPageInQuery,
    }
  }

  return {
    getQueryPageParams,
  }
}
