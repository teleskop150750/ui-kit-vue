import type { ExecuteValidator } from '../types'
import { any } from './any'
import { array } from './array'
import { boolean } from './boolean'
import { date } from './date'
import { enumerable } from './enum'
import { float } from './float'
import { integer } from './integer'
import { method } from './method'
import { number } from './number'
import { object } from './object'
import { pattern } from './pattern'
import { regexp } from './regexp'
import { required } from './required'
import { string } from './string'
import { type } from './type'

type DefaultValidators =
  | 'string'
  | 'method'
  | 'number'
  | 'boolean'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'pattern'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
  | 'required'
  | 'any'

type HintedString<KnownValues extends string> = (string & {}) | KnownValues

export const validators: Record<HintedString<DefaultValidators>, ExecuteValidator> = {
  string,
  method,
  number,
  boolean,
  regexp,
  integer,
  float,
  array,
  object,
  enum: enumerable,
  pattern,
  date,
  url: type,
  hex: type,
  email: type,
  required,
  any,
}
