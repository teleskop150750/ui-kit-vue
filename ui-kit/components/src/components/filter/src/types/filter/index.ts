import type { FieldFilter } from '../filter-field'

export interface FilterNotSaved {
  id: string
  isSaved: false
  fields: FieldFilter[]
}

export interface FilterSaved {
  id: string
  name: string
  isSaved: true
  fields: FieldFilter[]
}

export type Filter = FilterSaved | FilterNotSaved
