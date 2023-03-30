export type RouteRecordName = string | symbol

export type RouteParamValue = string
export type RouteParamValueRaw = RouteParamValue | number | null | undefined
export type RouteParamsRaw = Record<string, RouteParamValueRaw | Exclude<RouteParamValueRaw, null | undefined>[]>

export interface LocationAsRelativeRaw {
  name?: RouteRecordName
  params?: RouteParamsRaw
}
