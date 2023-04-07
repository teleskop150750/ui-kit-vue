import type { ComputedRef } from 'vue'

import type { RouteLocation, RouteLocationRaw } from '../../../config-provider'
import type { NPaginationNavQueryProps } from '../pagination-nav.model'

interface Props {
  queryType: ComputedRef<NPaginationNavQueryProps['queryType']>
  pageNumberOrOffsetQueryParamName: ComputedRef<NPaginationNavQueryProps['pageNumberOrOffsetQueryParamName']>
  pageSizeQueryParamName: ComputedRef<NPaginationNavQueryProps['pageSizeQueryParamName']>
}

export function useRouteLocation(
  routeNav: ComputedRef<RouteLocation | undefined>,
  { queryType, pageNumberOrOffsetQueryParamName, pageSizeQueryParamName }: Props,
) {
  function makeLocation(page: number, size: number): RouteLocationRaw | undefined {
    if (!queryType.value) {
      return undefined
    }

    if (!routeNav.value) {
      return undefined
    }

    if (!pageNumberOrOffsetQueryParamName.value) {
      return undefined
    }

    if (!pageSizeQueryParamName.value) {
      return undefined
    }

    return {
      path: routeNav.value.path,
      query: {
        ...routeNav.value.query,
        [pageNumberOrOffsetQueryParamName.value]: getQueryPageNumber(queryType.value, page, size),
        [pageSizeQueryParamName.value]: getQueryPageSize(size),
      },
      hash: routeNav.value.hash,
    }
  }

  return {
    makeLocation,
  }
}

function getQueryPageNumber(
  queryType: Required<Pick<NPaginationNavQueryProps, 'queryType'>>['queryType'],
  page: number,
  size: number,
) {
  if (queryType === 'number') {
    return page
  }

  return (page - 1) * size
}

function getQueryPageSize(size: number) {
  return size
}
