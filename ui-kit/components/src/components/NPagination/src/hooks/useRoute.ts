import type { Nillable } from '@nado/ui-kit-utils'
import { computed, getCurrentInstance } from 'vue'

import type { RouteLocation } from '../../../NConfigProvider'
import type { NPaginationProps } from '../NPagination.model'

export function useRoute(props: Pick<NPaginationProps, 'queryType'>) {
  const instance = getCurrentInstance()!

  const route = computed<Nillable<RouteLocation>>(() => {
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

  return {
    route,
  }
}
