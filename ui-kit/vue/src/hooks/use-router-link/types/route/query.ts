import type { Arrayable } from '@ui/utils'

export type LocationQueryValue = string | null

export type LocationQueryValueRaw = LocationQueryValue | number | undefined

export type LocationQueryRaw = Record<string | number, Arrayable<LocationQueryValueRaw>>
