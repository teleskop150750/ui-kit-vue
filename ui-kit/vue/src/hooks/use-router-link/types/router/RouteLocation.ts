import type { Arrayable } from '@ui/utils'

import type { LocationQueryValue, RouteParamValue } from '../route'

type RouteRecordName = string | symbol

type RouteParams = Record<string, RouteParamValue | RouteParamValue[]>

interface RouteMeta extends Record<string | number | symbol, unknown> {}

interface MatcherLocation {
  /**
   * Name of the matched record
   */
  name: RouteRecordName | null | undefined
  /**
   * Percentage encoded pathname section of the URL.
   */
  path: string
  /**
   * Object of decoded params extracted from the `path`.
   */
  params: RouteParams
  /**
   * Merged `meta` properties from all the matched route records.
   */
  meta: RouteMeta
}

type LocationQuery = Record<string, Arrayable<LocationQueryValue>>

export interface RouteLocation extends Pick<MatcherLocation, 'name' | 'path' | 'params' | 'meta'> {
  fullPath: string
  query: LocationQuery
  hash: string
}
