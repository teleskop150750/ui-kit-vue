import type { LocationAsRelativeRaw } from './LocationAsRelativeRaw'
import type { MatcherLocationAsPath } from './MatcherLocationAsPath'
import type { RouteLocationOptions } from './RouteLocationOptions'
import type { RouteQueryAndHash } from './RouteQueryAndHash'

export interface _RouteLocationPathRaw extends RouteQueryAndHash, MatcherLocationAsPath, RouteLocationOptions {}

export interface _RouteLocationNamedRaw extends RouteQueryAndHash, LocationAsRelativeRaw, RouteLocationOptions {}

export type RouteTo = string | _RouteLocationPathRaw | _RouteLocationNamedRaw
