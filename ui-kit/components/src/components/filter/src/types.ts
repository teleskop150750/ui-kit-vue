/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SearchField {
  value: string
  label: string
}

export const FilterOperator = {
  ANY: 'ANY',
  FILLED: 'FILLED',
  EMPTY: 'EMPTY',
  LIKE: 'LIKE',
  EQ: 'EQ',
  IN: 'IN',
  BTW: 'BTW',
  GTE: 'GTE',
  LTE: 'LTE',
} as const

export type FilterFieldType = 'string' | 'number' | 'date' | 'list'

export type Filter =
  | { ANY: true }
  | { FILLED: true }
  | { EMPTY: true }
  | { EQ: string | number }
  | { LIKE: string }
  | { IN: Array<string | number | Record<string, any>> }
  | {
      BTW:
        | {
            start: string
            end: string
          }
        | {
            start: number
            end: number
          }
    }
  | { GTE: string | number }
  | { LTE: string | number }

interface FilterFieldBase {
  name: string
  label: string
  type: FilterFieldType
  isVisibleInModel: boolean
  // value?: Filter
}

export interface FilterFieldString extends FilterFieldBase {
  type: 'string'
  value?:
    | {
        LIKE: string
      }
    | undefined
}
export interface FilterFieldNumber extends FilterFieldBase {
  type: 'number'
  value?:
    | { ANY: true }
    | { FILLED: true }
    | { EMPTY: true }
    | { EQ: number }
    | {
        BTW: {
          start: number
          end: number
        }
      }
    // | { IN: Nillable<Array<number>> }
    | { GTE: number }
    | { LTE: number }
    | undefined
}

export interface FilterFieldDate extends FilterFieldBase {
  type: 'date'
  value?:
    | { ANY: true }
    | { FILLED: true }
    | { EMPTY: true }
    | { EQ: string }
    | {
        BTW: {
          start: string
          end: string
        }
      }
    // | { IN: Nillable<Array<string>> }
    | { GTE: string }
    | { LTE: string }
    | undefined
}

export interface FilterFieldList extends FilterFieldBase {
  name: 'list'
  options: Array<{
    key: string | number
    value: string | number | Record<string, any>
    label: string
    disabled?: boolean
  }>
  valueKey?: string
  value?: { IN: Array<string | number | Record<string, any>> }
}

export type FieldProps = FilterFieldString | FilterFieldNumber | FilterFieldDate | FilterFieldList
export type FilterField = FilterFieldString | FilterFieldNumber | FilterFieldDate | FilterFieldList

// export interface FilterField extends FilterFieldBase {
//   valueKey?: string
//   options?: Array<{
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     value: string | number | Record<string, any>
//     label: string
//     disabled: boolean
//   }>
//   // value?: Nillable<Array<string | number>>
// }

export function assertFieldString(payload: FilterField): payload is FilterFieldString {
  return payload.type === 'string'
}

export function assertFieldNumber(payload: FilterField): payload is FilterFieldNumber {
  return payload.type === 'number'
}

export function assertFieldDate(payload: FilterField): payload is FilterFieldDate {
  return payload.type === 'date'
}

export function assertFieldList(payload: FilterField): payload is FilterFieldList {
  return payload.type === 'list'
}
