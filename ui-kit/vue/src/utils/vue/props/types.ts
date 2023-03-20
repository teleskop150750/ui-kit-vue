/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ExtractPropTypes, PropType } from 'vue'

import type { epPropKey as nPropKey } from './runtime'
import type { IfNever, UnknownToNever, WritableArray } from './utils'

type Val<T> = T[keyof T]

/**
 * Extract the type of a single prop
 *
 * @example
 * ExtractPropType<{ type: StringConstructor }> => string | undefined
 * ExtractPropType<{ type: StringConstructor, required: true }> => string
 * ExtractPropType<{ type: BooleanConstructor }> => boolean
 */
export type ExtractPropType<T extends object> = Val<
  ExtractPropTypes<{
    key: T
  }>
>

/**
 * Extracts types via `ExtractPropTypes`, accepting `PropType<T>`, `XXXConstructor`, `never`...
 *
 * @example
 * ResolvePropType<BooleanConstructor> => boolean
 * ResolvePropType<PropType<T>> => T
 * */
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>
    required: true
  }>
>

/**
 * Merge Type, Value, Validator types\
 *
 * @example
 * EpPropMergeType<StringConstructor, '1', 1> =>  1 | "1" // ignores StringConstructor
 * EpPropMergeType<StringConstructor, never, number> =>  string | number
 */
export type NPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>

/**
 * Handling default values for input (constraints)
 */
export type NPropInputDefault<Required extends boolean, Default> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<any>
  ? () => Default
  : (() => Default) | Default

/**
 * Native prop types, e.g: `BooleanConstructor`, `StringConstructor`, `null`, `undefined`, etc.
 */
export type NativePropType = ((...args: any) => any) | { new (...args: any): any } | undefined | null
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N

/**
 * input prop `buildProp` or `buildProps` (constraints)
 *
 * @example
 * NPropInput<StringConstructor, 'a', never, never, true>
 * ⬇️
 * {
    type?: StringConstructor | undefined;
    required?: true | undefined;
    values?: readonly "a"[] | undefined;
    validator?: ((val: any) => boolean) | ((val: any) => val is never) | undefined;
    default?: undefined;
  }
 */
export interface NPropInput<
  Type,
  Value,
  Validator,
  Default extends NPropMergeType<Type, Value, Validator>,
  Required extends boolean,
> {
  type?: Type
  required?: Required
  values?: readonly Value[]
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean)
  default?: NPropInputDefault<Required, Default>
}

/**
 * output prop `buildProp` or `buildProps`.
 *
 * @example
 * NProp<'a', 'b', true>
 * ⬇️
 * {
    readonly type: PropType<"a">;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly default: "b";
    __nPropKey: true;
  }
 */
export type NProp<Type, Default, Required> = {
  readonly type: PropType<Type>
  readonly required: [Required] extends [true] ? true : false
  readonly validator: ((val: unknown) => boolean) | undefined
  [nPropKey]: true
} & IfNever<Default, unknown, { readonly default: Default }>

/**
 * Determine if it is `NProp`
 */
export type IfNProp<T, Y, N> = T extends { [nPropKey]: true } ? Y : N

/**
 * Converting input to output.
 */
export type NPropConvert<Input> = Input extends NPropInput<
  infer Type,
  infer Value,
  infer Validator,
  any,
  infer Required
>
  ? NPropFinalized<Type, Value, Validator, Input['default'], Required>
  : never

/**
 * Окончательный результат преобразования
 */
export type NPropFinalized<Type, Value, Validator, Default, Required> = NProp<
  NPropMergeType<Type, Value, Validator>,
  UnknownToNever<Default>,
  Required
>

export {}
