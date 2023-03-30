/* eslint-disable @typescript-eslint/no-explicit-any */
import { type PropType, warn } from 'vue'

import { hasOwn } from '../../objects'
import { isObject } from '../../types'
import type {
  IfNativePropType,
  IfNProp,
  NativePropType,
  NProp,
  NPropConvert,
  NPropFinalized,
  NPropInput,
  NPropMergeType,
} from './types'

export const nPropKey = '__nPropKey'

export const definePropType = <T>(val: any): PropType<T> => val

export const isNProp = (val: unknown): val is NProp<any, any, any> => isObject(val) && !!(val as any)[nPropKey]

/**
 * @description Build prop. Это может лучше оптимизировать типы реквизита
 * @example
  // ограниченные варианты
  // тип будет таким PropType<'light' | 'dark'>
  buildProp({
    type: String,
    values: ['light', 'dark'],
  } as const)
  * @example
  // ограниченные варианты и другие типы
  // тип будет таким PropType<'small' | 'large' | number>
  buildProp({
    type: [String, Number],
    values: ['small', 'large'],
    validator: (val: unknown): val is number => typeof val === 'number',
  } as const)
  @link see more: https://github.com/element-plus/element-plus/pull/3341
 */
export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends NPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false,
>(
  prop: NPropInput<Type, Value, Validator, Default, Required>,
  key?: string,
): NPropFinalized<Type, Value, Validator, Default, Required> => {
  // фильтровать собственный тип реквизита и вложенный реквизит, например `null`, `undefined` (from `buildProps`)
  if (!isObject(prop) || isNProp(prop)) {
    return prop as any
  }

  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = [...values]

            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }

            valid ||= allowedValues.includes(val)
          }

          if (validator) {
            valid ||= validator(val)
          }

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(', ')

            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`,
            )
          }

          return valid
        }
      : undefined

  const epProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [nPropKey]: true,
  }

  if (hasOwn(prop, 'default')) {
    epProp.default = defaultValue
  }

  return epProp
}

export const buildProps = <
  Props extends Record<string, { [nPropKey]: true } | NativePropType | NPropInput<any, any, any, any, any>>,
>(
  props: Props,
): {
  [K in keyof Props]: IfNProp<Props[K], Props[K], IfNativePropType<Props[K], Props[K], NPropConvert<Props[K]>>>
} => Object.fromEntries(Object.entries(props).map(([key, option]) => [key, buildProp(option as any, key)])) as any
