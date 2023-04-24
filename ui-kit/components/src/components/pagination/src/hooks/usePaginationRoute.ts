import { computed, getCurrentInstance } from 'vue'

import type { RouteLocation } from '../../../config-provider'
import type { NPaginationProps } from '../pagination.model'

export function usePaginationRoute(props: Pick<NPaginationProps, 'queryType'>) {
  const instance = getCurrentInstance()!

  const paginationRoute = computed<RouteLocation>(() => {
    if (!props.queryType) {
      return undefined
    }

    if (!instance) {
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const route = (instance.proxy as any)?.$route

    if (!route) {
      return undefined
    }

    return route
  })

  return { paginationRoute }
}
