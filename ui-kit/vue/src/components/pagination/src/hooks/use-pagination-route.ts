import type { RouteLocation } from '@ui/hooks'
import { computed, getCurrentInstance } from 'vue'

import type { NPaginationProps } from '../pagination.model'

export function usePaginationRoute(props: Pick<NPaginationProps, 'queryType'>) {
  const instance = getCurrentInstance()!

  const routeNav = computed(() => {
    if (!props.queryType) {
      return undefined
    }

    if (!instance) {
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const route_ = (instance.proxy as any)?.$route

    if (!route_) {
      return undefined
    }

    return route_ as RouteLocation
  })

  const isRouterNav = computed(() => !!routeNav.value)

  return { isRouterNav, routeNav }
}
