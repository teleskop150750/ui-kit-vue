import type { RouteTo } from '@ui/hooks'

import type { NPaginationNavQueryProps } from '../nav.model'
import { usePaginationRoute } from './use-pagination-route'

export function useNavRouter(props: NPaginationNavQueryProps) {
  const { isRouter, route } = usePaginationRoute(props)

  function makeLink(page: number, size: number): RouteTo | undefined {
    if (!props.queryType) {
      return undefined
    }

    if (!route.value) {
      return undefined
    }

    if (!props.pageNumberQueryParamName) {
      return undefined
    }

    if (!props.pageSizeQueryParamName) {
      return undefined
    }

    return {
      path: route.value.path,
      query: {
        ...route.value.query,
        [props.pageNumberQueryParamName]: getQueryPageNumber(props.queryType, page, size),
        [props.pageSizeQueryParamName]: getQueryPageSize(size),
      },
      hash: route.value.hash,
    }
  }

  return {
    isRouter,
    makeLink,
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
