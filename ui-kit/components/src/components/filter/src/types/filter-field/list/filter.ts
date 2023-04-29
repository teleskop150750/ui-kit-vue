export interface FilterListIn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IN: Array<string | number | Record<string, any>>
}

export type FilterList = FilterListIn

export const FilterListOperatorMap = {
  IN: 'IN',
} as const

export type FilterListOperator = (typeof FilterListOperatorMap)[keyof typeof FilterListOperatorMap]
