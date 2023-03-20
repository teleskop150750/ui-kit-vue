import { enumerable } from './enum'
import { pattern } from './pattern'
import { range } from './range'
import { required } from './required'
import { type } from './type'
import { whitespace } from './whitespace'

export const rules = {
  required,
  whitespace,
  type,
  range,
  enum: enumerable,
  pattern,
}
