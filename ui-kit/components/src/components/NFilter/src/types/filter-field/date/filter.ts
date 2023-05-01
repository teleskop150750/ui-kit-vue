import type { Nillable } from '@nado/ui-kit-utils'

export interface FilterDateAny {
  ANY: true
}

export interface FilterDateFilled {
  FILLED: true
}

export interface FilterDateEmpty {
  EMPTY: true
}

export interface FilterDateEq {
  EQ: string
}

export interface FilterDateGte {
  GTE: string
}

export interface FilterDateLte {
  LTE: string
}

export interface FilterDateBtw {
  BTW: {
    start: Nillable<string>
    end: Nillable<string>
  }
}

export type FilterDate =
  | FilterDateAny
  | FilterDateFilled
  | FilterDateEmpty
  | FilterDateEq
  | FilterDateGte
  | FilterDateLte
  | FilterDateBtw

export const FilterDateOperatorMap = {
  ANY: 'ANY',
  FILLED: 'FILLED',
  EMPTY: 'EMPTY',
  LIKE: 'LIKE',
  EQ: 'EQ',
  GTE: 'GTE',
  LTE: 'LTE',
  BTW: 'BTW',
} as const

export type FilterDateOperator = (typeof FilterDateOperatorMap)[keyof typeof FilterDateOperatorMap]
