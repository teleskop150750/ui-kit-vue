import type { Nillable } from './typescript'
import type { ValidateValue } from './values'

type ValidateMessage<T extends any[] = unknown[]> = string | ((...args: T) => string)
type FullField = Nillable<string>
type EnumString = Nillable<string>
type Pattern = Nillable<string | RegExp>
type Range = Nillable<number>
type Type = Nillable<string>

export interface ValidateMessages {
  default?: ValidateMessage
  required?: ValidateMessage<[FullField]>
  enum?: ValidateMessage<[FullField, EnumString]>
  whitespace?: ValidateMessage<[FullField]>
  date?: {
    format?: ValidateMessage
    parse?: ValidateMessage
    invalid?: ValidateMessage
  }
  types?: {
    string?: ValidateMessage<[FullField, Type]>
    method?: ValidateMessage<[FullField, Type]>
    array?: ValidateMessage<[FullField, Type]>
    object?: ValidateMessage<[FullField, Type]>
    number?: ValidateMessage<[FullField, Type]>
    date?: ValidateMessage<[FullField, Type]>
    boolean?: ValidateMessage<[FullField, Type]>
    integer?: ValidateMessage<[FullField, Type]>
    float?: ValidateMessage<[FullField, Type]>
    regexp?: ValidateMessage<[FullField, Type]>
    email?: ValidateMessage<[FullField, Type]>
    url?: ValidateMessage<[FullField, Type]>
    hex?: ValidateMessage<[FullField, Type]>
  }
  string?: {
    len?: ValidateMessage<[FullField, Range]>
    min?: ValidateMessage<[FullField, Range]>
    max?: ValidateMessage<[FullField, Range]>
    range?: ValidateMessage<[FullField, Range, Range]>
  }
  number?: {
    len?: ValidateMessage<[FullField, Range]>
    min?: ValidateMessage<[FullField, Range]>
    max?: ValidateMessage<[FullField, Range]>
    range?: ValidateMessage<[FullField, Range, Range]>
  }
  array?: {
    len?: ValidateMessage<[FullField, Range]>
    min?: ValidateMessage<[FullField, Range]>
    max?: ValidateMessage<[FullField, Range]>
    range?: ValidateMessage<[FullField, Range, Range]>
  }
  pattern?: {
    mismatch?: ValidateMessage<[FullField, ValidateValue, Pattern]>
  }
}

export interface InternalValidateMessages extends ValidateMessages {
  clone: () => InternalValidateMessages
}
