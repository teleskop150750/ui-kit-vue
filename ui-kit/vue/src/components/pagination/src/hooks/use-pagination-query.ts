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

      function getPageFromQuery() {
        const pageFromQuery: PageFromQuery = {
          current: undefined,
          size: undefined,
        }

        if (!props.queryType || !pageSizeQueryParamName.value || !pageNumberOrOffsetQueryParamName.value) {
          return pageFromQuery
        }

        const pageSize = getQueryParamValue(pageSizeQueryParamName.value)

        if (pageSize === undefined) {
          return pageFromQuery
        }

        const numberOrOffset = getQueryParamValue(pageNumberOrOffsetQueryParamName.value)

        if (numberOrOffset === undefined) {
          return pageFromQuery
        }

        if (props.queryType === 'number') {
          pageFromQuery.current = numberOrOffset
          pageFromQuery.size = pageSize

          return pageFromQuery
        }

        if (props.queryType === 'offset') {
          pageFromQuery.size = numberOrOffset / pageSize
          pageFromQuery.size = pageSize

          return pageFromQuery
        }

        return pageFromQuery
      }

      return {
        queryPageSize,
        queryPageNumberOrOffset,
        init: getPageFromQuery(),
      }
    }

    return {
      getQueryPageParamsName,
      getPageInQuery,
    }
  }

  function getQueryParamValue(param: string) {
    if (!route.value) {
      return undefined
    }

    if (!route.value.query) {
      return undefined
    }

    if (!route.value.query[param]) {
      return undefined
    }

    return Number(route.value.query[param])
  }

  return {
    getQueryPageParams,
  }
}
