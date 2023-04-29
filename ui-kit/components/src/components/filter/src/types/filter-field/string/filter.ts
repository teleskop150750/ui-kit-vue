export interface FilterStringLike {
  LIKE: string
}

export type FilterString = FilterStringLike

export const FilterStringOperatorMap = {
  LIKE: 'LIKE',
} as const

export type FilterStringOperator = (typeof FilterStringOperatorMap)[keyof typeof FilterStringOperatorMap]
