import type { Nillable } from '@nado/ui-kit-utils'

export interface FilterNumberAny {
  ANY: true
}

export interface FilterNumberFilled {
  FILLED: true
}

export interface FilterNumberEmpty {
  EMPTY: true
}

export interface FilterNumberEq {
  EQ: number
}

export interface FilterNumberGte {
  GTE: number
}

export interface FilterNumberLte {
  LTE: number
}

export interface FilterNumberBtw {
  BTW: {
    start: Nillable<number>
    end: Nillable<number>
  }
}

export type FilterNumber =
  | FilterNumberAny
  | FilterNumberFilled
  | FilterNumberEmpty
  | FilterNumberEq
  | FilterNumberGte
  | FilterNumberLte
  | FilterNumberBtw

export const FilterNumberOperatorMap = {
  ANY: 'ANY',
  FILLED: 'FILLED',
  EMPTY: 'EMPTY',
  LIKE: 'LIKE',
  EQ: 'EQ',
  GTE: 'GTE',
  LTE: 'LTE',
  BTW: 'BTW',
} as const

export type FilterNumberOperator = (typeof FilterNumberOperatorMap)[keyof typeof FilterNumberOperatorMap]
